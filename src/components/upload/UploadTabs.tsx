"use client";

import { cn } from "@/lib/utils";

export type UploadTab = "file" | "url" | "figma";

export interface UploadTabsProps {
  activeTab: UploadTab;
  onTabChange: (tab: UploadTab) => void;
  className?: string;
}

const tabs: { id: UploadTab; label: string; description: string }[] = [
  { id: "file", label: "Upload", description: "Images & screenshots" },
  { id: "url", label: "Website", description: "Live URL capture" },
  { id: "figma", label: "Figma", description: "Figma frame export" },
];

export function UploadTabs({ activeTab, onTabChange, className }: UploadTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:gap-1",
        "rounded-[var(--radius-lg)] border border-[var(--glass-border)]",
        "bg-[var(--glass-bg-subtle)] p-1 backdrop-blur-[var(--blur-md)]",
        className
      )}
      role="tablist"
      aria-label="Upload method"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-1 flex-col items-center rounded-[var(--radius-md)] px-4 py-3",
              "text-center transition-all duration-[var(--transition-fast)]",
              isActive
                ? "bg-[var(--glass-bg-elevated)] shadow-[var(--shadow-glass-sm)]"
                : "hover:bg-[var(--glass-bg-subtle)]"
            )}
          >
            <span
              className={cn(
                "text-[var(--text-sm)] font-[var(--font-weight-semibold)]",
                isActive
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-secondary)]"
              )}
            >
              {tab.label}
            </span>
            <span className="mt-0.5 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {tab.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
