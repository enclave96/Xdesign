import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { scheduleAnalysis } from '@/lib/analysis/processor';
import {
  jsonResponse,
  unauthorizedResponse,
  notFoundResponse,
  errorResponse,
} from '@/lib/api-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });

  if (!project) return notFoundResponse('Project not found');

  if (!project.filePath) {
    return errorResponse('Project has no image file to analyze');
  }

  const existingPending = await prisma.analysis.findFirst({
    where: {
      projectId: id,
      status: { in: ['pending', 'processing'] },
    },
  });

  if (existingPending) {
    return jsonResponse({
      analysis: existingPending,
      message: 'Analysis already in progress',
    });
  }

  const analysis = await prisma.analysis.create({
    data: {
      projectId: id,
      status: 'pending',
    },
  });

  scheduleAnalysis(analysis.id);

  return jsonResponse({ analysis }, 202);
}
