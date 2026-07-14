import { saveBufferAsFile } from '../storage';
import type { SavedFile } from '../storage';

export interface WebsiteCaptureResult {
  savedFile: SavedFile;
  sourceUrl: string;
  method: 'screenshot' | 'og-image' | 'favicon';
}

async function fetchOgImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; XdesignBot/1.0; +https://xdesign.app)',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) return null;

    const html = await response.text();

    const ogPatterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i,
    ];

    for (const pattern of ogPatterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        const imageUrl = new URL(match[1], url).href;
        const imgResponse = await fetch(imageUrl, {
          signal: AbortSignal.timeout(15000),
        });
        if (imgResponse.ok) {
          return Buffer.from(await imgResponse.arrayBuffer());
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

async function fetchFavicon(url: string): Promise<Buffer | null> {
  try {
    const parsed = new URL(url);
    const faviconUrl = `${parsed.origin}/favicon.ico`;
    const response = await fetch(faviconUrl, {
      signal: AbortSignal.timeout(10000),
    });
    if (response.ok) {
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length > 100) return buffer;
    }
    return null;
  } catch {
    return null;
  }
}

async function captureScreenshot(url: string): Promise<Buffer | null> {
  try {
    const puppeteer = await import('puppeteer-core');

    const executablePaths = [
      process.env.CHROMIUM_PATH,
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
    ].filter(Boolean) as string[];

    let browser = null;
    for (const execPath of executablePaths) {
      try {
        browser = await puppeteer.default.launch({
          executablePath: execPath,
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
        });
        break;
      } catch {
        continue;
      }
    }

    if (!browser) return null;

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false,
      });
      return Buffer.from(screenshot);
    } finally {
      await browser.close();
    }
  } catch {
    return null;
  }
}

export async function captureWebsite(
  userId: string,
  url: string
): Promise<WebsiteCaptureResult> {
  let normalizedUrl: string;
  try {
    normalizedUrl = new URL(url).href;
  } catch {
    throw new Error('Invalid URL provided');
  }

  let buffer: Buffer | null = null;
  let method: WebsiteCaptureResult['method'] = 'screenshot';

  buffer = await captureScreenshot(normalizedUrl);

  if (!buffer) {
    buffer = await fetchOgImage(normalizedUrl);
    method = 'og-image';
  }

  if (!buffer) {
    buffer = await fetchFavicon(normalizedUrl);
    method = 'favicon';
  }

  if (!buffer) {
    throw new Error(
      'Unable to capture website. Screenshot unavailable and no og:image found.'
    );
  }

  const savedFile = await saveBufferAsFile(userId, buffer, 'image/png');

  return {
    savedFile,
    sourceUrl: normalizedUrl,
    method,
  };
}

export async function fetchFigmaPreview(
  userId: string,
  figmaUrl: string
): Promise<WebsiteCaptureResult> {
  let normalizedUrl: string;
  try {
    normalizedUrl = new URL(figmaUrl).href;
  } catch {
    throw new Error('Invalid Figma URL provided');
  }

  if (!normalizedUrl.includes('figma.com')) {
    throw new Error('URL must be a Figma link');
  }

  const buffer = await fetchOgImage(normalizedUrl);

  if (!buffer) {
    throw new Error('Unable to fetch Figma preview image. Try exporting and uploading directly.');
  }

  const savedFile = await saveBufferAsFile(userId, buffer, 'image/png');

  return {
    savedFile,
    sourceUrl: normalizedUrl,
    method: 'og-image',
  };
}
