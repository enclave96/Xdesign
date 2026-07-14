import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export interface SavedFile {
  filePath: string;
  thumbnailPath: string;
  relativePath: string;
  relativeThumbnailPath: string;
}

export async function ensureUploadDirs(userId: string): Promise<string> {
  const userDir = path.join(UPLOAD_DIR, userId);
  const thumbDir = path.join(userDir, 'thumbnails');
  await fs.mkdir(thumbDir, { recursive: true });
  return userDir;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
}

function getExtension(mimeType: string, filename?: string): string {
  const mimeMap: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };
  if (mimeMap[mimeType]) return mimeMap[mimeType];
  if (filename) {
    const ext = path.extname(filename).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
      return ext === '.jpeg' ? '.jpg' : ext;
    }
  }
  return '.png';
}

export async function saveUploadedFile(
  userId: string,
  file: File
): Promise<SavedFile> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const userDir = await ensureUploadDirs(userId);
  const ext = getExtension(file.type, file.name);
  const fileId = uuidv4();
  const filename = `${fileId}${ext}`;
  const thumbFilename = `${fileId}_thumb.webp`;

  const absolutePath = path.join(userDir, filename);
  const thumbAbsolutePath = path.join(userDir, 'thumbnails', thumbFilename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absolutePath, buffer);

  await sharp(buffer)
    .resize(400, 300, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbAbsolutePath);

  const relativePath = path.join(userId, filename);
  const relativeThumbnailPath = path.join(userId, 'thumbnails', thumbFilename);

  return {
    filePath: absolutePath,
    thumbnailPath: thumbAbsolutePath,
    relativePath,
    relativeThumbnailPath,
  };
}

export async function saveBufferAsFile(
  userId: string,
  buffer: Buffer,
  mimeType: string = 'image/png'
): Promise<SavedFile> {
  const userDir = await ensureUploadDirs(userId);
  const ext = getExtension(mimeType);
  const fileId = uuidv4();
  const filename = `${fileId}${ext}`;
  const thumbFilename = `${fileId}_thumb.webp`;

  const absolutePath = path.join(userDir, filename);
  const thumbAbsolutePath = path.join(userDir, 'thumbnails', thumbFilename);

  await fs.writeFile(absolutePath, buffer);

  await sharp(buffer)
    .resize(400, 300, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbAbsolutePath);

  const relativePath = path.join(userId, filename);
  const relativeThumbnailPath = path.join(userId, 'thumbnails', thumbFilename);

  return {
    filePath: absolutePath,
    thumbnailPath: thumbAbsolutePath,
    relativePath,
    relativeThumbnailPath,
  };
}

export function resolveSecurePath(relativePath: string): string | null {
  const normalized = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolutePath = path.join(UPLOAD_DIR, normalized);
  const resolvedUpload = path.resolve(UPLOAD_DIR);
  const resolvedFile = path.resolve(absolutePath);

  if (!resolvedFile.startsWith(resolvedUpload + path.sep) && resolvedFile !== resolvedUpload) {
    return null;
  }

  return resolvedFile;
}

export async function deleteProjectFiles(
  filePath: string | null,
  thumbnailPath: string | null
): Promise<void> {
  const paths = [filePath, thumbnailPath].filter(Boolean) as string[];
  await Promise.all(
    paths.map(async (p) => {
      try {
        const resolved = resolveSecurePath(p);
        if (resolved) await fs.unlink(resolved);
      } catch {
        // File may already be deleted
      }
    })
  );
}

export function getUploadDir(): string {
  return UPLOAD_DIR;
}

export { ALLOWED_MIME_TYPES, MAX_FILE_SIZE };
