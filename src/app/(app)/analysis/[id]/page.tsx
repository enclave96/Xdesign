"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { ScoreGrid } from "@/components/analysis/ScoreGrid";
import { IssueList } from "@/components/analysis/IssueList";
import { AnnotatedPreview } from "@/components/analysis/AnnotatedPreview";
import { AnalysisProgress } from "@/components/analysis/AnalysisProgress";
import { RecommendationsPanel } from "@/components/analysis/RecommendationsPanel";
import {
  api,
  getAssetUrl,
  type AnalysisDetail,
  type IssueRecord,
} from "@/lib/api";
import { getAuthErrorMessage } from "@/hooks/useAuth";
import type { CategoryScores } from "@/lib/analysis/types";

const POLL_INTERVAL = 2000;

export default function AnalysisPage() {
  const params = useParams();
  const id = params.id as string;

  const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueRecord | null>(null);

  const fetchAnalysis = useCallback(async () => {
    try {
      const { analysis: data } = await api.analyses.get(id);
      setAnalysis(data);
      setError(null);

      const { project } = await api.projects.get(data.project.id);
      setImageUrl(getAssetUrl(project.filePath ?? project.thumbnailPath));

      return data;
    } catch (err) {
      setError(getAuthErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  useEffect(() => {
    if (!analysis) return;
    if (analysis.status !== "pending" && analysis.status !== "processing") return;

    const interval = setInterval(async () => {
      const updated = await fetchAnalysis();
      if (
        updated &&
        updated.status !== "pending" &&
        updated.status !== "processing"
      ) {
        clearInterval(interval);
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [analysis?.status, fetchAnalysis]);

  function handleDownloadReport() {
    window.open(api.analyses.reportUrl(id), "_blank");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Analysis not found.</p>
          <Button href="/dashboard" variant="secondary" className="mt-4">
            Back to dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isProcessing =
    analysis.status === "pending" || analysis.status === "processing";
  const isComplete = analysis.status === "completed";

  const categoryScores: CategoryScores | null = analysis.scores
    ? (() => {
        const { overall: _o, ...rest } = analysis.scores;
        return rest as CategoryScores;
      })()
    : null;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href={`/projects/${analysis.project.id}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {analysis.project.name}
          </Link>
          <h1 className="mt-2 text-2xl font-bold">Analysis Report</h1>
        </div>

        {isComplete && (
          <Button variant="secondary" onClick={handleDownloadReport}>
            Download HTML report
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isProcessing && <AnalysisProgress status={analysis.status} className="mb-8" />}

      {isComplete && (
        <>
          <Card className="mb-8">
            <CardContent className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-center">
              {analysis.overallScore != null && (
                <ScoreRing
                  score={analysis.overallScore}
                  size="xl"
                  label="Overall UX Score"
                />
              )}
              <div className="max-w-md text-center sm:text-left">
                <h2 className="text-lg font-semibold">
                  {analysis.overallScore != null && analysis.overallScore >= 80
                    ? "Great work!"
                    : analysis.overallScore != null && analysis.overallScore >= 60
                      ? "Good foundation"
                      : "Room for improvement"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {analysis.issues.length} issue
                  {analysis.issues.length !== 1 ? "s" : ""} identified across{" "}
                  {categoryScores ? Object.keys(categoryScores).length : 8} categories.
                </p>
              </div>
            </CardContent>
          </Card>

          {categoryScores && <ScoreGrid scores={categoryScores} className="mb-8" />}

          <div className="mb-8 grid gap-8 lg:grid-cols-2">
            <AnnotatedPreview
              imageUrl={imageUrl}
              issues={analysis.issues}
              selectedIssueId={selectedIssue?.id}
              onIssueClick={setSelectedIssue}
            />
            <IssueList
              issues={analysis.issues}
              selectedId={selectedIssue?.id}
              onSelect={setSelectedIssue}
            />
          </div>

          {selectedIssue && (
            <Card className="mb-8">
              <CardContent className="py-6">
                <h3 className="text-base font-semibold">{selectedIssue.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedIssue.description}
                </p>
                <p className="mt-3 text-sm">
                  <span className="font-medium text-foreground">Recommendation: </span>
                  <span className="text-muted-foreground">{selectedIssue.recommendation}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <RecommendationsPanel report={analysis.report} />
        </>
      )}

      {analysis.status === "failed" && (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold text-destructive">Analysis failed</h2>
            <p className="mt-2 text-muted-foreground">
              Something went wrong during analysis. Please try again from the project page.
            </p>
            <Button href={`/projects/${analysis.project.id}`} className="mt-6">
              Go to project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
