export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type IssueCategory =
  | 'color-contrast'
  | 'typography'
  | 'touch-target'
  | 'visual-hierarchy'
  | 'navigation'
  | 'readability'
  | 'consistency'
  | 'interaction'
  | 'wcag'
  | 'layout';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnalysisIssue {
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface CategoryScores {
  visualHierarchy: number;
  navigationClarity: number;
  readability: number;
  consistency: number;
  interactionClarity: number;
  wcagCompliance: number;
  typography: number;
  touchTargets: number;
}

export interface ColorContrastDetail {
  foreground: string;
  background: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  region: BoundingBox;
}

export interface TypographyDetail {
  estimatedFontSize: number;
  lineHeightRatio: number;
  region: BoundingBox;
  issue?: string;
}

export interface AnalysisReport {
  summary: string;
  strengths: string[];
  recommendations: string[];
  colorContrasts: ColorContrastDetail[];
  typographyDetails: TypographyDetail[];
  metadata: {
    imageWidth: number;
    imageHeight: number;
    analyzedAt: string;
    processingTimeMs: number;
  };
}

export interface AnalysisResult {
  overallScore: number;
  scores: CategoryScores;
  issues: AnalysisIssue[];
  report: AnalysisReport;
}

export interface AnalysisScoresJson extends CategoryScores {
  overall: number;
}
