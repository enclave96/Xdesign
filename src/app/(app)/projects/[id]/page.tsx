"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { api, getAssetUrl, type ProjectDetail } from "@/lib/api";
import { getAuthErrorMessage } from "@/hooks/useAuth";

const sourceLabels: Record<string, string> = {
  upload: "File upload",
  url: "Website capture",
  figma: "Figma import",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProject = useCallback(async () => {
    try {
      const { project: data } = await api.projects.get(id);
      setProject(data);
      setError(null);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  async function handleAnalyze() {
    setAnalyzing(true);
    setError(null);
    try {
      const { analysis } = await api.projects.analyze(id);
      router.push(`/analysis/${analysis.id}`);
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setAnalyzing(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await api.projects.delete(id);
      router.push("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Project not found.</p>
          <Button href="/dashboard" variant="secondary" className="mt-4">
            Back to dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const thumbnailUrl = getAssetUrl(project.thumbnailPath);
  const imageUrl = getAssetUrl(project.filePath);
  const latest = project.latestAnalysis;

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border bg-muted">
          {(imageUrl ?? thumbnailUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl ?? thumbnailUrl!}
              alt={project.name}
              className="block h-auto w-full"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center">
              <p className="text-sm text-muted-foreground">No preview available</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sourceLabels[project.sourceType] ?? project.sourceType} ·{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>

          {project.sourceUrl && (
            <p className="mt-2 truncate text-sm text-muted-foreground">
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                {project.sourceUrl}
              </a>
            </p>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <SectionCard className="mt-6" title="Analysis">
            {latest ? (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                {latest.overallScore != null && (
                  <ScoreRing score={latest.overallScore} size="md" label="Overall" />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <SeverityBadge
                    severity={
                      latest.status === "failed"
                        ? "critical"
                        : latest.status === "completed"
                          ? "low"
                          : "info"
                    }
                  >
                    {latest.status}
                  </SeverityBadge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No analysis has been run yet.</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {latest?.status === "completed" ? (
                <Button href={`/analysis/${latest.id}`}>View report</Button>
              ) : latest?.status === "pending" || latest?.status === "processing" ? (
                <Button href={`/analysis/${latest.id}`} variant="secondary">
                  View progress
                </Button>
              ) : null}

              <Button
                variant={latest?.status === "completed" ? "secondary" : "default"}
                loading={analyzing}
                onClick={handleAnalyze}
                disabled={
                  analyzing ||
                  latest?.status === "pending" ||
                  latest?.status === "processing"
                }
              >
                {latest?.status === "completed" ? "Re-analyze" : "Start analysis"}
              </Button>
              <Button variant="ghost" onClick={handleDelete}>
                Delete project
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
