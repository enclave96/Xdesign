"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
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
    <Card
      className={cn(
        "group overflow-hidden transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground">No preview</span>
            </div>
          )}

          {score != null && (
            <div className="absolute right-3 top-3 rounded-md bg-card p-1.5 shadow-sm">
              <ScoreRing score={score} size="sm" />
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {project.name}
            </h3>
            <span className="shrink-0 rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {sourceLabels[project.sourceType] ?? project.sourceType}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(project.createdAt)}
          </p>

          {status && status !== "completed" && (
            <div className="mt-2">
              <SeverityBadge
                severity={status === "failed" ? "critical" : "info"}
                size="sm"
                dot
              >
                {status === "processing" ? "Analyzing" : status}
              </SeverityBadge>
            </div>
          )}
        </CardContent>
      </Link>

      {onDelete && (
        <CardFooter className="border-t px-4 py-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDelete(project.id);
            }}
            className="rounded-sm px-2 py-1 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            Delete project
          </button>
        </CardFooter>
      )}
    </Card>
  );
}
