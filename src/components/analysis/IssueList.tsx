"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassSelect } from "@/components/ui/GlassSelect";
import { CATEGORY_LABELS, type IssueRecord } from "@/lib/api";
import type { IssueCategory, IssueSeverity } from "@/lib/analysis/types";
import { cn } from "@/lib/utils";

export interface IssueListProps {
  issues: IssueRecord[];
  selectedId?: string | null;
  onSelect?: (issue: IssueRecord) => void;
  className?: string;
}

const ALL = "all";

export function IssueList({
  issues,
  selectedId,
  onSelect,
  className,
}: IssueListProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL);
  const [severityFilter, setSeverityFilter] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set(issues.map((i) => i.category));
    return Array.from(set).sort();
  }, [issues]);

  const severities: IssueSeverity[] = ["critical", "high", "medium", "low", "info"];

  const filtered = useMemo(() => {
    return issues.filter((issue) => {
      if (categoryFilter !== ALL && issue.category !== categoryFilter) return false;
      if (severityFilter !== ALL && issue.severity !== severityFilter) return false;
      return true;
    });
  }, [issues, categoryFilter, severityFilter]);

  return (
    <GlassCard
      title="Issues"
      description={`${filtered.length} of ${issues.length} issues`}
      variant="elevated"
      className={className}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <GlassSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="flex-1"
        >
          <option value={ALL}>All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat as IssueCategory]}
            </option>
          ))}
        </GlassSelect>

        <GlassSelect
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          aria-label="Filter by severity"
          className="flex-1"
        >
          <option value={ALL}>All severities</option>
          {severities.map((sev) => (
            <option key={sev} value={sev}>
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </option>
          ))}
        </GlassSelect>
      </div>

      <div className="glass-scrollbar max-h-[480px] space-y-2 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-[var(--text-sm)] text-[var(--color-text-muted)]">
            No issues match the current filters.
          </p>
        ) : (
          filtered.map((issue) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => onSelect?.(issue)}
              className={cn(
                "group relative w-full overflow-hidden rounded-[var(--radius-md)] border p-4 text-left",
                "backdrop-blur-[var(--blur-sm)] backdrop-saturate-150",
                "transition-all duration-[var(--transition-smooth)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]",
                selectedId === issue.id
                  ? "border-[var(--color-purple-400)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass-md)]"
                  : "border-[var(--glass-border-subtle)] bg-[var(--glass-bg-subtle)] hover:border-[var(--glass-border)] hover:bg-[var(--glass-bg)] hover:shadow-[var(--shadow-glass-sm)] hover:-translate-y-px"
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[var(--glass-input-shine)] opacity-0 transition-opacity duration-[var(--transition-smooth)] group-hover:opacity-60"
              />
              <div className="relative flex flex-wrap items-center gap-2">
                <Badge severity={issue.severity} size="sm">
                  {issue.severity}
                </Badge>
                <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-muted)]">
                  {CATEGORY_LABELS[issue.category]}
                </span>
              </div>
              <h4 className="relative mt-2 text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                {issue.title}
              </h4>
              <p className="relative mt-1 line-clamp-2 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                {issue.description}
              </p>
            </button>
          ))
        )}
      </div>
    </GlassCard>
  );
}
