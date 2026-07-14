import prisma from '@/lib/db';
import { runAnalysis } from '@/lib/analysis/engine';
import { resolveSecurePath } from '@/lib/storage';
import type { AnalysisResult, AnalysisIssue } from '@/lib/analysis/types';
import type { Prisma } from '@prisma/client';

export async function processAnalysis(analysisId: string): Promise<void> {
  try {
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: 'processing' },
    });

    const analysis = await prisma.analysis.findUnique({
      where: { id: analysisId },
      include: { project: true },
    });

    if (!analysis?.project?.filePath) {
      throw new Error('Project has no image file to analyze');
    }

    const absolutePath = resolveSecurePath(analysis.project.filePath);
    if (!absolutePath) {
      throw new Error('Invalid file path');
    }

    const result: AnalysisResult = await runAnalysis(absolutePath);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.analysis.update({
        where: { id: analysisId },
        data: {
          status: 'completed',
          overallScore: result.overallScore,
          scores: JSON.stringify({ ...result.scores, overall: result.overallScore }),
          report: JSON.stringify(result.report),
          completedAt: new Date(),
        },
      });

      if (result.issues.length > 0) {
        await tx.issue.createMany({
          data: result.issues.map((issue: AnalysisIssue) => ({
            analysisId,
            category: issue.category,
            severity: issue.severity,
            title: issue.title,
            description: issue.description,
            recommendation: issue.recommendation,
            x: issue.x ?? null,
            y: issue.y ?? null,
            width: issue.width ?? null,
            height: issue.height ?? null,
          })),
        });
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: 'failed',
        report: JSON.stringify({ error: message }),
        completedAt: new Date(),
      },
    });
  }
}

export function scheduleAnalysis(analysisId: string): void {
  setImmediate(() => {
    processAnalysis(analysisId).catch(console.error);
  });
}
