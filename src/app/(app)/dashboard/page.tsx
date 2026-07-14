"use client";

import { useCallback, useEffect, useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { api, type ProjectSummary } from "@/lib/api";
import { getAuthErrorMessage } from "@/hooks/useAuth";

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      const { projects: data } = await api.projects.list();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await api.projects.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-bold)]">
            Dashboard
          </h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            Your design analysis history
          </p>
        </div>
        <GlassButton href="/upload" variant="primary">
          New analysis
        </GlassButton>
      </div>

      {error && (
        <GlassPanel variant="subtle" padding="md" className="mb-6 border-[var(--color-severity-critical-border)]">
          <p className="text-[var(--text-sm)] text-[var(--color-severity-critical)]">{error}</p>
        </GlassPanel>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] animate-pulse rounded-[var(--radius-lg)] bg-[var(--glass-bg-subtle)]"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <GlassPanel variant="elevated" padding="lg" className="text-center">
          <h2 className="text-[var(--text-xl)] font-[var(--font-weight-semibold)]">
            No projects yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[var(--color-text-secondary)]">
            Upload your first design to get an instant UX analysis with scores and
            recommendations.
          </p>
          <GlassButton href="/upload" variant="primary" size="lg" className="mt-6">
            Upload a design
          </GlassButton>
        </GlassPanel>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
