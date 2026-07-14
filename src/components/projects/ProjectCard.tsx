"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Badge } from "@/components/ui/Badge";
import { getAssetUrl, type ProjectSummary } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: ProjectSummary;
  onDelete?: (id: string) => void;
  className?: string;
}

const sourceLabels: Record<string, string> = {
  upload: "Upload",
  url: "Website",
  figma: "Figma",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProjectCard({ project, onDelete, className }: ProjectCardProps) {
  const latestAnalysis = project.analyses[0];
  const thumbnailUrl = getAssetUrl(project.thumbnailPath);
  const score = latestAnalysis?.overallScore ?? null;
  const status = latestAnalysis?.status;

  return (
    <GlassCard className={cn("group overflow-hidden transition-shadow hover:shadow-[var(--shadow-glass-lg)]", className)} padding="none">
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-slate-100)]">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                No preview
              </span>
            </div>
          )}

          {score != null && (
            <div className="absolute right-3 top-3 rounded-[var(--radius-md)] bg-white/90 p-1 shadow-[var(--shadow-glass-sm)] backdrop-blur-sm">
              <ScoreRing score={score} size="sm" />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[var(--text-base)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
              {project.name}
            </h3>
            <span className="shrink-0 rounded-[var(--radius-sm)] bg-[var(--glass-bg-subtle)] px-2 py-0.5 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {sourceLabels[project.sourceType] ?? project.sourceType}
            </span>
          </div>

          <p className="mt-1 text-[var(--text-xs)] text-[var(--color-text-muted)]">
            {formatDate(project.createdAt)}
          </p>

          {status && status !== "completed" && (
            <div className="mt-2">
              <Badge
                severity={status === "failed" ? "critical" : "info"}
                size="sm"
                dot
              >
                {status === "processing" ? "Analyzing" : status}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {onDelete && (
        <div className="border-t border-[var(--glass-border-subtle)] px-4 py-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDelete(project.id);
            }}
            className="text-[var(--text-sm)] text-[var(--color-severity-critical)] hover:underline"
          >
            Delete project
          </button>
        </div>
      )}
    </GlassCard>
  );
}
