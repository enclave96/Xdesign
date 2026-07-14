"use client";

import { FileImage, Globe, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadTab = "file" | "url" | "figma";

export interface UploadTabsProps {
  activeTab: UploadTab;
  onTabChange: (tab: UploadTab) => void;
  className?: string;
}

const tabs: {
  id: UploadTab;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "file",
    label: "Upload",
    description: "Images & screenshots",
    icon: <FileImage className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: "url",
    label: "Website",
    description: "Live URL capture",
    icon: <Globe className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: "figma",
    label: "Figma",
    description: "Frame export",
    icon: <PenTool className="h-4 w-4" strokeWidth={1.75} />,
  },
];

export function UploadTabs({ activeTab, onTabChange, className }: UploadTabsProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1.5 sm:flex-row sm:gap-1",
        "rounded-[var(--radius-xl)] border border-[var(--glass-border)]",
        "bg-[var(--glass-bg-subtle)] p-1.5",
        "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
        "shadow-[var(--shadow-glass-sm)]",
        className
      )}
      role="tablist"
      aria-label="Upload method"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[var(--radius-xl)] bg-[var(--glass-input-shine)] opacity-60"
      />

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
              "relative flex flex-1 flex-col items-center rounded-[var(--radius-lg)] px-4 py-3.5",
              "text-center transition-all duration-[var(--transition-smooth)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]",
              isActive
                ? "bg-[var(--glass-bg-elevated)] shadow-[var(--shadow-glass-md)] border border-[var(--glass-border-strong)]"
                : "border border-transparent hover:bg-[var(--glass-bg-subtle)] hover:border-[var(--glass-border-subtle)]"
            )}
          >
            {isActive && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[var(--radius-lg)] bg-[var(--glass-input-shine)]"
              />
            )}
            <span
              className={cn(
                "relative mb-1.5 flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]",
                "transition-all duration-[var(--transition-smooth)]",
                isActive
                  ? "bg-[var(--gradient-accent)] text-white shadow-[0_2px_12px_rgba(99,102,241,0.35)]"
                  : "bg-[var(--glass-bg)] text-[var(--color-text-muted)]"
              )}
            >
              {tab.icon}
            </span>
            <span
              className={cn(
                "relative text-[var(--text-sm)] font-[var(--font-weight-semibold)]",
                isActive
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-secondary)]"
              )}
            >
              {tab.label}
            </span>
            <span className="relative mt-0.5 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {tab.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
