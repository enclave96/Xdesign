import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const user = await getSessionUser(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  const analysis = await prisma.analysis.findFirst({
    where: {
      id,
      project: { userId: user.id },
    },
    include: {
      issues: true,
      project: {
        select: { id: true, name: true, sourceType: true },
      },
    },
  });

  if (!analysis) return notFoundResponse('Analysis not found');

  const parsed = {
    ...analysis,
    scores: analysis.scores ? JSON.parse(analysis.scores) : null,
    report: analysis.report ? JSON.parse(analysis.report) : null,
  };

  return jsonResponse({ analysis: parsed });
}
