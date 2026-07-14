import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { generateHtmlReport, generateReportFilename } from '@/lib/report';
import type { CategoryScores } from '@/lib/analysis/types';
import { unauthorizedResponse, notFoundResponse, errorResponse } from '@/lib/api-utils';

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
      project: { select: { name: true } },
    },
  });

  if (!analysis) return notFoundResponse('Analysis not found');

  if (analysis.status !== 'completed') {
    return errorResponse('Analysis is not yet completed', 400);
  }

  const scores = analysis.scores
    ? (JSON.parse(analysis.scores) as CategoryScores & { overall?: number })
    : null;
  const report = analysis.report ? JSON.parse(analysis.report) : null;

  if (!scores || !report) {
    return errorResponse('Report data unavailable', 500);
  }

  const { overall: _overall, ...categoryScores } = scores;

  const html = generateHtmlReport({
    projectName: analysis.project.name,
    analysisId: analysis.id,
    overallScore: analysis.overallScore ?? 0,
    scores: categoryScores as CategoryScores,
    issues: analysis.issues.map((issue) => ({
      category: issue.category as import('@/lib/analysis/types').IssueCategory,
      severity: issue.severity as import('@/lib/analysis/types').IssueSeverity,
      title: issue.title,
      description: issue.description,
      recommendation: issue.recommendation,
      x: issue.x ?? undefined,
      y: issue.y ?? undefined,
      width: issue.width ?? undefined,
      height: issue.height ?? undefined,
    })),
    report,
    createdAt: analysis.createdAt,
    completedAt: analysis.completedAt,
  });

  const filename = generateReportFilename(analysis.project.name);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
