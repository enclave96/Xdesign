import sharp from 'sharp';
import type {
  AnalysisIssue,
  AnalysisResult,
  BoundingBox,
  CategoryScores,
  ColorContrastDetail,
  TypographyDetail,
} from './types';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RegionStats {
  region: BoundingBox;
  avgColor: RGB;
  variance: number;
  edgeDensity: number;
  estimatedText: boolean;
}

function relativeLuminance({ r, g, b }: RGB): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(fg: RGB, bg: RGB): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromRatio(ratio: number): AnalysisIssue['severity'] {
  if (ratio < 3) return 'critical';
  if (ratio < 4.5) return 'high';
  if (ratio < 7) return 'medium';
  return 'low';
}

async function extractPixelData(imagePath: string) {
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height, channels: info.channels };
}

function getPixelRGB(
  data: Buffer,
  width: number,
  channels: number,
  x: number,
  y: number
): RGB {
  const idx = (y * width + x) * channels;
  return { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
}

function computeEdgeMap(data: Buffer, width: number, height: number, channels: number): Float32Array {
  const edges = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const tl = getPixelRGB(data, width, channels, x - 1, y - 1);
      const tc = getPixelRGB(data, width, channels, x, y - 1);
      const tr = getPixelRGB(data, width, channels, x + 1, y - 1);
      const ml = getPixelRGB(data, width, channels, x - 1, y);
      const mr = getPixelRGB(data, width, channels, x + 1, y);
      const bl = getPixelRGB(data, width, channels, x - 1, y + 1);
      const bc = getPixelRGB(data, width, channels, x, y + 1);
      const br = getPixelRGB(data, width, channels, x + 1, y + 1);

      const gx =
        -tl.r - 2 * ml.r - bl.r + tr.r + 2 * mr.r + br.r +
        -tl.g - 2 * ml.g - bl.g + tr.g + 2 * mr.g + br.g +
        -tl.b - 2 * ml.b - bl.b + tr.b + 2 * mr.b + br.b;

      const gy =
        -tl.r - 2 * tc.r - tr.r + bl.r + 2 * bc.r + br.r +
        -tl.g - 2 * tc.g - tr.g + bl.g + 2 * bc.g + br.g +
        -tl.b - 2 * tc.b - tr.b + bl.b + 2 * bc.b + br.b;

      edges[y * width + x] = Math.sqrt(gx * gx + gy * gy) / (255 * 3);
    }
  }

  return edges;
}

function analyzeRegion(
  data: Buffer,
  edges: Float32Array,
  width: number,
  height: number,
  channels: number,
  box: BoundingBox
): RegionStats {
  const x0 = Math.max(0, Math.floor(box.x));
  const y0 = Math.max(0, Math.floor(box.y));
  const x1 = Math.min(width, Math.floor(box.x + box.width));
  const y1 = Math.min(height, Math.floor(box.y + box.height));

  let rSum = 0,
    gSum = 0,
    bSum = 0,
    count = 0,
    edgeSum = 0;

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const rgb = getPixelRGB(data, width, channels, x, y);
      rSum += rgb.r;
      gSum += rgb.g;
      bSum += rgb.b;
      edgeSum += edges[y * width + x];
      count++;
    }
  }

  const avgColor: RGB = {
    r: Math.round(rSum / count),
    g: Math.round(gSum / count),
    b: Math.round(bSum / count),
  };

  let variance = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const rgb = getPixelRGB(data, width, channels, x, y);
      variance +=
        Math.pow(rgb.r - avgColor.r, 2) +
        Math.pow(rgb.g - avgColor.g, 2) +
        Math.pow(rgb.b - avgColor.b, 2);
    }
  }
  variance /= count * 3;

  const edgeDensity = edgeSum / count;
  const estimatedText = edgeDensity > 0.08 && variance > 400;

  return { region: box, avgColor, variance, edgeDensity, estimatedText };
}

function sampleContrastRegions(
  data: Buffer,
  width: number,
  height: number,
  channels: number,
  gridCols: number = 4,
  gridRows: number = 4
): ColorContrastDetail[] {
  const results: ColorContrastDetail[] = [];
  const cellW = width / gridCols;
  const cellH = height / gridRows;

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const region: BoundingBox = {
        x: col * cellW,
        y: row * cellH,
        width: cellW,
        height: cellH,
      };

      const x0 = Math.floor(region.x);
      const y0 = Math.floor(region.y);
      const x1 = Math.min(width, Math.floor(region.x + region.width));
      const y1 = Math.min(height, Math.floor(region.y + region.height));

      const colors: RGB[] = [];
      const step = Math.max(1, Math.floor(Math.min(cellW, cellH) / 8));

      for (let y = y0; y < y1; y += step) {
        for (let x = x0; x < x1; x += step) {
          colors.push(getPixelRGB(data, width, channels, x, y));
        }
      }

      colors.sort((a, b) => relativeLuminance(a) - relativeLuminance(b));
      const darkest = colors[0];
      const lightest = colors[colors.length - 1];
      const ratio = contrastRatio(darkest, lightest);

      if (ratio < 7) {
        results.push({
          foreground: rgbToHex(darkest),
          background: rgbToHex(lightest),
          ratio: Math.round(ratio * 100) / 100,
          wcagAA: ratio >= 4.5,
          wcagAAA: ratio >= 7,
          region,
        });
      }
    }
  }

  return results;
}

function detectTextRegions(
  data: Buffer,
  edges: Float32Array,
  width: number,
  height: number,
  channels: number
): RegionStats[] {
  const regions: RegionStats[] = [];
  const blockSize = Math.max(32, Math.floor(Math.min(width, height) / 12));

  for (let y = 0; y < height - blockSize; y += blockSize) {
    for (let x = 0; x < width - blockSize; x += blockSize) {
      const box: BoundingBox = { x, y, width: blockSize, height: blockSize };
      const stats = analyzeRegion(data, edges, width, height, channels, box);
      if (stats.estimatedText) {
        regions.push(stats);
      }
    }
  }

  return regions;
}

function detectTouchTargets(
  edges: Float32Array,
  width: number,
  height: number
): BoundingBox[] {
  const targets: BoundingBox[] = [];
  const minTouchSize = 44;
  const blockSize = Math.max(minTouchSize, Math.floor(width / 20));

  for (let y = 0; y < height - blockSize; y += Math.floor(blockSize / 2)) {
    for (let x = 0; x < width - blockSize; x += Math.floor(blockSize / 2)) {
      let edgeCount = 0;
      let total = 0;

      for (let dy = 0; dy < blockSize; dy++) {
        for (let dx = 0; dx < blockSize; dx++) {
          const px = x + dx;
          const py = y + dy;
          if (px < width && py < height) {
            edgeCount += edges[py * width + px];
            total++;
          }
        }
      }

      const density = edgeCount / total;
      if (density > 0.12 && density < 0.35) {
        const boxW = blockSize * 0.8;
        const boxH = blockSize * 0.6;
        if (boxW < minTouchSize || boxH < minTouchSize) {
          targets.push({
            x: x + (blockSize - boxW) / 2,
            y: y + (blockSize - boxH) / 2,
            width: boxW,
            height: boxH,
          });
        }
      }
    }
  }

  return targets.slice(0, 10);
}

function computeVisualHierarchyScore(
  textRegions: RegionStats[],
  width: number,
  height: number
): number {
  if (textRegions.length === 0) return 65;

  const sizes = textRegions.map((r) => r.region.height);
  const uniqueSizes = new Set(sizes.map((s) => Math.round(s / 10) * 10));
  const sizeVariety = uniqueSizes.size;

  const topThird = textRegions.filter((r) => r.region.y < height / 3);
  const hasHeader = topThird.some((r) => r.edgeDensity > 0.15);

  let score = 60;
  if (sizeVariety >= 3) score += 20;
  else if (sizeVariety >= 2) score += 10;
  if (hasHeader) score += 15;
  if (textRegions.length > 5) score += 5;

  return clampScore(score);
}

function computeNavigationScore(edges: Float32Array, width: number, height: number): number {
  const navRegionHeight = Math.floor(height * 0.12);
  let navEdgeDensity = 0;
  let count = 0;

  for (let y = 0; y < navRegionHeight; y++) {
    for (let x = 0; x < width; x++) {
      navEdgeDensity += edges[y * width + x];
      count++;
    }
  }

  const density = navEdgeDensity / count;
  let score = 50;

  if (density > 0.05 && density < 0.25) score += 30;
  else if (density > 0.02) score += 15;

  const horizontalBands = 5;
  const bandWidth = width / horizontalBands;
  let evenlyDistributed = true;

  for (let i = 0; i < horizontalBands; i++) {
    let bandEdges = 0;
    for (let y = 0; y < navRegionHeight; y++) {
      for (let x = Math.floor(i * bandWidth); x < Math.floor((i + 1) * bandWidth); x++) {
        bandEdges += edges[y * width + x];
      }
    }
    if (bandEdges / (navRegionHeight * bandWidth) < 0.02) {
      evenlyDistributed = false;
    }
  }

  if (evenlyDistributed) score += 20;

  return clampScore(score);
}

function computeReadabilityScore(textRegions: RegionStats[]): number {
  if (textRegions.length === 0) return 55;

  const avgEdgeDensity =
    textRegions.reduce((sum, r) => sum + r.edgeDensity, 0) / textRegions.length;

  let score = 50;
  if (avgEdgeDensity > 0.1 && avgEdgeDensity < 0.25) score += 25;
  if (textRegions.length >= 3 && textRegions.length <= 20) score += 15;
  if (textRegions.every((r) => r.variance > 200)) score += 10;

  return clampScore(score);
}

function computeConsistencyScore(data: Buffer, width: number, height: number, channels: number): number {
  const samples: RGB[] = [];
  const step = Math.max(1, Math.floor(width / 20));

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      samples.push(getPixelRGB(data, width, channels, x, y));
    }
  }

  const colorBuckets = new Map<string, number>();
  for (const rgb of samples) {
    const key = `${Math.round(rgb.r / 32)}-${Math.round(rgb.g / 32)}-${Math.round(rgb.b / 32)}`;
    colorBuckets.set(key, (colorBuckets.get(key) ?? 0) + 1);
  }

  const sorted = Array.from(colorBuckets.values()).sort((a, b) => b - a);
  const dominantShare = sorted[0] / samples.length;

  let score = 70;
  if (colorBuckets.size > 30) score -= 20;
  else if (colorBuckets.size > 20) score -= 10;
  if (dominantShare > 0.5) score += 15;
  if (sorted.length >= 3 && sorted[2] / samples.length > 0.05) score += 10;

  return clampScore(score);
}

function computeInteractionScore(
  touchTargets: BoundingBox[],
  width: number
): number {
  let score = 75;
  const smallTargets = touchTargets.length;
  score -= smallTargets * 8;

  const minTouchSize = 44;
  const estimatedButtonWidth = width / 15;
  if (estimatedButtonWidth < minTouchSize) score -= 15;

  return clampScore(score);
}

function computeWcagScore(contrastIssues: ColorContrastDetail[]): number {
  const failAA = contrastIssues.filter((c) => !c.wcagAA).length;
  const failAAA = contrastIssues.filter((c) => !c.wcagAAA).length;

  let score = 100;
  score -= failAA * 12;
  score -= failAAA * 5;

  return clampScore(score);
}

function computeTypographyScore(textRegions: RegionStats[], imageHeight: number): number {
  if (textRegions.length === 0) return 60;

  const minFontEstimate = Math.min(...textRegions.map((r) => r.region.height * 0.6));
  const maxFontEstimate = Math.max(...textRegions.map((r) => r.region.height * 0.8));

  let score = 65;
  if (minFontEstimate >= 12) score += 15;
  else if (minFontEstimate >= 10) score += 5;
  else score -= 15;

  if (maxFontEstimate / minFontEstimate > 1.5 && maxFontEstimate / minFontEstimate < 4) {
    score += 10;
  }

  const bodyRegions = textRegions.filter((r) => r.region.y > imageHeight * 0.2);
  if (bodyRegions.length > 0) score += 10;

  return clampScore(score);
}

function computeTouchTargetScore(smallTargets: BoundingBox[]): number {
  let score = 90;
  score -= smallTargets.length * 10;
  return clampScore(score);
}

function buildIssues(
  contrastIssues: ColorContrastDetail[],
  textRegions: RegionStats[],
  smallTouchTargets: BoundingBox[],
  scores: CategoryScores,
  width: number,
  height: number
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];

  for (const contrast of contrastIssues.filter((c) => !c.wcagAA).slice(0, 5)) {
    issues.push({
      category: 'color-contrast',
      severity: severityFromRatio(contrast.ratio),
      title: 'Insufficient color contrast',
      description: `Contrast ratio of ${contrast.ratio}:1 between ${contrast.foreground} and ${contrast.background} fails WCAG AA (requires 4.5:1).`,
      recommendation:
        'Increase contrast between text and background colors. Use a contrast checker to verify ratios meet WCAG AA (4.5:1) or AAA (7:1) standards.',
      x: contrast.region.x,
      y: contrast.region.y,
      width: contrast.region.width,
      height: contrast.region.height,
    });
  }

  const smallTextRegions = textRegions.filter((r) => r.region.height * 0.7 < 12);
  for (const region of smallTextRegions.slice(0, 3)) {
    issues.push({
      category: 'typography',
      severity: 'high',
      title: 'Text may be too small',
      description: `Detected text region with estimated font size below 12px, which can hinder readability on mobile devices.`,
      recommendation:
        'Use a minimum body text size of 16px (12pt) for mobile and 14px minimum for secondary text.',
      x: region.region.x,
      y: region.region.y,
      width: region.region.width,
      height: region.region.height,
    });
  }

  for (const target of smallTouchTargets.slice(0, 5)) {
    issues.push({
      category: 'touch-target',
      severity: 'medium',
      title: 'Touch target may be too small',
      description: `Interactive element appears to be approximately ${Math.round(target.width)}×${Math.round(target.height)}px. WCAG recommends minimum 44×44px touch targets.`,
      recommendation:
        'Increase clickable area to at least 44×44 pixels with adequate spacing between adjacent targets.',
      x: target.x,
      y: target.y,
      width: target.width,
      height: target.height,
    });
  }

  if (scores.visualHierarchy < 70) {
    issues.push({
      category: 'visual-hierarchy',
      severity: 'medium',
      title: 'Weak visual hierarchy',
      description:
        'The design lacks clear typographic or spatial hierarchy, making it difficult for users to scan content.',
      recommendation:
        'Establish clear heading levels, use size and weight contrast, and group related content with whitespace.',
      x: width * 0.1,
      y: height * 0.05,
      width: width * 0.8,
      height: height * 0.3,
    });
  }

  if (scores.navigationClarity < 65) {
    issues.push({
      category: 'navigation',
      severity: 'medium',
      title: 'Navigation may be unclear',
      description:
        'Top navigation area shows limited visual structure or inconsistent spacing between nav items.',
      recommendation:
        'Use consistent nav item styling, clear active states, and adequate spacing. Consider a sticky header for long pages.',
      x: 0,
      y: 0,
      width,
      height: height * 0.12,
    });
  }

  if (scores.readability < 65) {
    issues.push({
      category: 'readability',
      severity: 'medium',
      title: 'Readability concerns detected',
      description:
        'Text regions show characteristics that may reduce reading comfort, such as dense layouts or low contrast edges.',
      recommendation:
        'Increase line height to 1.5× font size, limit line length to 60-80 characters, and add paragraph spacing.',
    });
  }

  if (scores.consistency < 65) {
    issues.push({
      category: 'consistency',
      severity: 'low',
      title: 'Inconsistent color usage',
      description:
        'The design uses a wide palette without clear systematic color roles, which can confuse users.',
      recommendation:
        'Define a color system with primary, secondary, and semantic colors. Limit accent colors to 2-3 hues.',
    });
  }

  if (scores.wcagCompliance < 70) {
    issues.push({
      category: 'wcag',
      severity: 'high',
      title: 'WCAG compliance gaps',
      description:
        'Multiple regions fail WCAG contrast requirements, which affects users with low vision or color blindness.',
      recommendation:
        'Audit all text/background pairs against WCAG 2.1 AA. Provide non-color cues for state changes.',
    });
  }

  return issues;
}

function buildTypographyDetails(textRegions: RegionStats[]): TypographyDetail[] {
  return textRegions.slice(0, 8).map((r) => {
    const estimatedFontSize = Math.round(r.region.height * 0.7);
    const lineHeightRatio = 1.4;
    let issue: string | undefined;

    if (estimatedFontSize < 12) issue = 'Font size below recommended minimum';
    else if (r.edgeDensity < 0.08) issue = 'Low text clarity in region';

    return {
      estimatedFontSize,
      lineHeightRatio,
      region: r.region,
      issue,
    };
  });
}

function buildRecommendations(issues: AnalysisIssue[], scores: CategoryScores): string[] {
  const recs: string[] = [];
  const categories = new Set(issues.map((i) => i.category));

  if (categories.has('color-contrast') || scores.wcagCompliance < 75) {
    recs.push('Prioritize fixing color contrast issues — they have the highest accessibility impact.');
  }
  if (categories.has('touch-target') || scores.touchTargets < 75) {
    recs.push('Audit all buttons and links on touch devices; ensure 44px minimum tap targets.');
  }
  if (scores.visualHierarchy < 75) {
    recs.push('Create a clear typographic scale (e.g., 12/14/16/20/24/32px) and apply consistently.');
  }
  if (scores.navigationClarity < 75) {
    recs.push('Simplify navigation to 5-7 primary items; use dropdowns for secondary links.');
  }
  if (scores.readability < 75) {
    recs.push('Improve text blocks with 1.5 line-height, left alignment, and generous margins.');
  }
  if (recs.length === 0) {
    recs.push('Design shows strong fundamentals. Consider user testing to validate interaction flows.');
  }

  return recs;
}

function buildStrengths(scores: CategoryScores): string[] {
  const strengths: string[] = [];
  if (scores.visualHierarchy >= 80) strengths.push('Clear visual hierarchy guides user attention effectively.');
  if (scores.navigationClarity >= 80) strengths.push('Navigation structure appears well-organized.');
  if (scores.readability >= 80) strengths.push('Text content shows good readability characteristics.');
  if (scores.consistency >= 80) strengths.push('Consistent color and spacing patterns throughout.');
  if (scores.wcagCompliance >= 85) strengths.push('Strong WCAG color contrast compliance.');
  if (scores.typography >= 80) strengths.push('Typography sizing and hierarchy are well-executed.');
  if (strengths.length === 0) {
    strengths.push('Design provides a solid foundation for iterative improvement.');
  }
  return strengths;
}

export async function analyzeDesign(imagePath: string): Promise<AnalysisResult> {
  const startTime = Date.now();
  const { data, width, height, channels } = await extractPixelData(imagePath);
  const edges = computeEdgeMap(data, width, height, channels);

  const contrastIssues = sampleContrastRegions(data, width, height, channels);
  const textRegions = detectTextRegions(data, edges, width, height, channels);
  const smallTouchTargets = detectTouchTargets(edges, width, height);

  const scores: CategoryScores = {
    visualHierarchy: computeVisualHierarchyScore(textRegions, width, height),
    navigationClarity: computeNavigationScore(edges, width, height),
    readability: computeReadabilityScore(textRegions),
    consistency: computeConsistencyScore(data, width, height, channels),
    interactionClarity: computeInteractionScore(smallTouchTargets, width),
    wcagCompliance: computeWcagScore(contrastIssues),
    typography: computeTypographyScore(textRegions, height),
    touchTargets: computeTouchTargetScore(smallTouchTargets),
  };

  const weights = {
    visualHierarchy: 0.15,
    navigationClarity: 0.12,
    readability: 0.15,
    consistency: 0.1,
    interactionClarity: 0.12,
    wcagCompliance: 0.18,
    typography: 0.1,
    touchTargets: 0.08,
  };

  const overallScore = clampScore(
    Object.entries(weights).reduce(
      (sum, [key, weight]) => sum + scores[key as keyof CategoryScores] * weight,
      0
    )
  );

  const issues = buildIssues(
    contrastIssues,
    textRegions,
    smallTouchTargets,
    scores,
    width,
    height
  );

  const processingTimeMs = Date.now() - startTime;

  return {
    overallScore,
    scores,
    issues,
    report: {
      summary: `Design scored ${overallScore}/100 with ${issues.length} issue(s) identified across ${Object.keys(scores).length} categories.`,
      strengths: buildStrengths(scores),
      recommendations: buildRecommendations(issues, scores),
      colorContrasts: contrastIssues,
      typographyDetails: buildTypographyDetails(textRegions),
      metadata: {
        imageWidth: width,
        imageHeight: height,
        analyzedAt: new Date().toISOString(),
        processingTimeMs,
      },
    },
  };
}

export async function runAnalysis(imagePath: string): Promise<AnalysisResult> {
  return analyzeDesign(imagePath);
}
