"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-purple-500)] border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <GlassPanel variant="elevated" padding="lg" className="text-center">
        <p className="text-[var(--color-text-secondary)]">Project not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <GlassButton variant="secondary">Back to dashboard</GlassButton>
        </Link>
      </GlassPanel>
    );
  }

  const thumbnailUrl = getAssetUrl(project.thumbnailPath);
  const imageUrl = getAssetUrl(project.filePath);
  const latest = project.latestAnalysis;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-[var(--text-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          ← Back to dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-slate-100)]">
          {(imageUrl ?? thumbnailUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl ?? thumbnailUrl!}
              alt={project.name}
              className="block h-auto w-full"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center">
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                No preview available
              </p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-bold)]">
            {project.name}
          </h1>
          <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">
            {sourceLabels[project.sourceType] ?? project.sourceType} ·{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>

          {project.sourceUrl && (
            <p className="mt-2 truncate text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                {project.sourceUrl}
              </a>
            </p>
          )}

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-severity-critical-border)] bg-[var(--color-severity-critical-bg)] px-4 py-3 text-[var(--text-sm)] text-[var(--color-severity-critical)]"
            >
              {error}
            </div>
          )}

          <GlassCard className="mt-6" title="Analysis">
            {latest ? (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                {latest.overallScore != null && (
                  <ScoreRing score={latest.overallScore} size="md" label="Overall" />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <Badge
                    severity={
                      latest.status === "failed"
                        ? "critical"
                        : latest.status === "completed"
                          ? "low"
                          : "info"
                    }
                  >
                    {latest.status}
                  </Badge>
                  {latest.status === "completed" && (
                    <div className="mt-4">
                      <Link href={`/analysis/${latest.id}`}>
                        <GlassButton variant="primary">View report</GlassButton>
                      </Link>
                    </div>
                  )}
                  {(latest.status === "pending" || latest.status === "processing") && (
                    <div className="mt-4">
                      <Link href={`/analysis/${latest.id}`}>
                        <GlassButton variant="secondary">View progress</GlassButton>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                No analysis has been run yet.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <GlassButton
                variant="primary"
                loading={analyzing}
                onClick={handleAnalyze}
                disabled={
                  analyzing ||
                  latest?.status === "pending" ||
                  latest?.status === "processing"
                }
              >
                {latest?.status === "completed" ? "Re-analyze" : "Start analysis"}
              </GlassButton>
              <GlassButton variant="ghost" onClick={handleDelete}>
                Delete project
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
