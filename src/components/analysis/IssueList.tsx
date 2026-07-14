"use client";

import { useMemo, useState } from "react";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { SectionCard } from "@/components/ui/SectionCard";
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

const selectClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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
    <SectionCard
      title="Issues"
      description={`${filtered.length} of ${issues.length} issues`}
      className={className}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className={cn(selectClassName, "flex-1")}
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
          aria-label="Filter by severity"
          className={cn(selectClassName, "flex-1")}
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
          <p className="py-8 text-center text-sm text-muted-foreground">
            No issues match the current filters.
          </p>
        ) : (
          filtered.map((issue) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => onSelect?.(issue)}
              className={cn(
                "w-full rounded-md border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedId === issue.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={issue.severity} size="sm">
                  {issue.severity}
                </SeverityBadge>
                <span className="text-xs font-medium text-muted-foreground">
                  {CATEGORY_LABELS[issue.category]}
                </span>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-foreground">{issue.title}</h4>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {issue.description}
              </p>
            </button>
          ))
        )}
      </div>
    </SectionCard>
  );
}
