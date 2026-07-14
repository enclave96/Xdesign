import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { deleteProjectFiles } from '@/lib/storage';
import {
  jsonResponse,
  unauthorizedResponse,
  notFoundResponse,
  errorResponse,
} from '@/lib/api-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: {
      analyses: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: {
          issues: true,
        },
      },
    },
  });

  if (!project) return notFoundResponse('Project not found');

  const latestAnalysis = project.analyses[0] ?? null;

  return jsonResponse({
    project: {
      ...project,
      analyses: undefined,
      latestAnalysis,
    },
  });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });

  if (!project) return notFoundResponse('Project not found');

  try {
    await deleteProjectFiles(project.filePath, project.thumbnailPath);
    await prisma.project.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return errorResponse('Failed to delete project', 500);
  }
}
