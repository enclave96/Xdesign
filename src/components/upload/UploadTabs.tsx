"use client";

import { Gallery, Global, PenTool } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iconProps } from "@/components/icons";

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
    icon: <Gallery {...iconProps("sm")} />,
  },
  {
    id: "url",
    label: "Website",
    description: "Live URL capture",
    icon: <Global {...iconProps("sm")} />,
  },
  {
    id: "figma",
    label: "Figma",
    description: "Frame export",
    icon: <PenTool {...iconProps("sm")} />,
  },
];

export function UploadTabs({ activeTab, onTabChange, className }: UploadTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as UploadTab)}
      className={className}
    >
      <TabsList
        className="relative flex h-auto w-full flex-col gap-1.5 sm:flex-row sm:gap-1"
        aria-label="Upload method"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[var(--radius-xl)] bg-[var(--glass-input-shine)] opacity-60"
        />
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              "group relative flex h-auto flex-1 flex-col items-center px-4 py-3.5",
              "text-center transition-all duration-[var(--transition-smooth)]",
              "data-[state=active]:bg-[var(--glass-bg-elevated)]"
            )}
          >
            <span
              className={cn(
                "relative mb-1.5 flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]",
                "transition-all duration-[var(--transition-smooth)]",
                "bg-[var(--glass-bg)] text-[var(--color-text-muted)]",
                "group-data-[state=active]:bg-[var(--gradient-accent)] group-data-[state=active]:text-white"
              )}
            >
              {tab.icon}
            </span>
            <span className="relative text-[var(--text-sm)] font-[var(--font-weight-semibold)]">
              {tab.label}
            </span>
            <span className="relative mt-0.5 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {tab.description}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
