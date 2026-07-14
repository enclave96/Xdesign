import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/storage';
import { captureWebsite, fetchFigmaPreview } from '@/lib/analysis/website';
import { jsonResponse, unauthorizedResponse, errorResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      analyses: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
          id: true,
          status: true,
          overallScore: true,
          createdAt: true,
          completedAt: true,
        },
      },
    },
  });

  return jsonResponse({ projects });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const name = formData.get('name') as string | null;
      const file = formData.get('file') as File | null;
      const sourceType = (formData.get('sourceType') as string) || 'upload';

      if (!name?.trim()) {
        return errorResponse('Project name is required');
      }
      if (!file) {
        return errorResponse('File is required for upload');
      }

      const saved = await saveUploadedFile(user.id, file);

      const project = await prisma.project.create({
        data: {
          userId: user.id,
          name: name.trim(),
          sourceType,
          filePath: saved.relativePath,
          thumbnailPath: saved.relativeThumbnailPath,
        },
      });

      return jsonResponse({ project }, 201);
    }

    const body = await request.json();
    const { name, sourceType, url } = body;

    if (!name?.trim()) {
      return errorResponse('Project name is required');
    }

    if (!sourceType || !['url', 'figma'].includes(sourceType)) {
      return errorResponse('sourceType must be "url" or "figma" for URL-based projects');
    }

    if (!url) {
      return errorResponse('URL is required');
    }

    const capture =
      sourceType === 'figma'
        ? await fetchFigmaPreview(user.id, url)
        : await captureWebsite(user.id, url);

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        name: name.trim(),
        sourceType,
        sourceUrl: capture.sourceUrl,
        filePath: capture.savedFile.relativePath,
        thumbnailPath: capture.savedFile.relativeThumbnailPath,
      },
    });

    return jsonResponse({ project, captureMethod: capture.method }, 201);
  } catch (error) {
    console.error('Create project error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create project';
    return errorResponse(message, 500);
  }
}
