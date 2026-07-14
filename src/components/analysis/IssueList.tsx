"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
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
      className={className}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={cn(
            "flex-1 rounded-[var(--radius-md)] border border-[var(--glass-border)]",
            "bg-[var(--glass-bg)] px-3 py-2 text-[var(--text-sm)]",
            "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]"
          )}
          aria-label="Filter by category"
        >
          <option value={ALL}>All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat as IssueCategory]}
            </option>
          ))}
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className={cn(
            "flex-1 rounded-[var(--radius-md)] border border-[var(--glass-border)]",
            "bg-[var(--glass-bg)] px-3 py-2 text-[var(--text-sm)]",
            "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]"
          )}
          aria-label="Filter by severity"
        >
          <option value={ALL}>All severities</option>
          {severities.map((sev) => (
            <option key={sev} value={sev}>
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
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
                "w-full rounded-[var(--radius-md)] border p-4 text-left",
                "transition-all duration-[var(--transition-fast)]",
                selectedId === issue.id
                  ? "border-[var(--color-purple-400)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass-sm)]"
                  : "border-[var(--glass-border-subtle)] bg-[var(--glass-bg-subtle)] hover:border-[var(--glass-border)] hover:bg-[var(--glass-bg)]"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge severity={issue.severity} size="sm">
                  {issue.severity}
                </Badge>
                <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                  {CATEGORY_LABELS[issue.category]}
                </span>
              </div>
              <h4 className="mt-2 text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                {issue.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                {issue.description}
              </p>
            </button>
          ))
        )}
      </div>
    </GlassCard>
  );
}
