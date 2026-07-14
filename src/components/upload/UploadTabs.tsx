"use client";

import { Gallery, Global } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FigmaLogo } from "@/components/brand/FigmaLogo";
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
}[] = [
  {
    id: "file",
    label: "Upload",
    description: "Images & screenshots",
  },
  {
    id: "url",
    label: "Website",
    description: "Live URL capture",
  },
  {
    id: "figma",
    label: "Figma",
    description: "Figma frame export",
  },
];

function TabIcon({ tab, isActive }: { tab: UploadTab; isActive: boolean }) {
  if (tab === "figma") {
    return (
      <FigmaLogo
        className="h-4 w-[11px]"
        variant={isActive ? "mono" : "color"}
      />
    );
  }

  if (tab === "url") {
    return (
      <Global
        {...iconProps("sm", undefined, "Linear", {
          tone: isActive ? "light" : "inherit",
          interactive: false,
        })}
      />
    );
  }

  return (
    <Gallery
      {...iconProps("sm", undefined, "Linear", {
        tone: isActive ? "light" : "inherit",
        interactive: false,
      })}
    />
  );
}

export function UploadTabs({ activeTab, onTabChange, className }: UploadTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as UploadTab)}
      className={className}
    >
      <TabsList
        className="flex h-auto w-full flex-col gap-1.5 sm:flex-row sm:gap-1"
        aria-label="Upload method"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "group flex h-auto flex-1 flex-col items-center px-4 py-3.5 text-center"
              )}
            >
              <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-sm bg-muted text-foreground group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground">
                <TabIcon tab={tab.id} isActive={isActive} />
              </span>
              <span className="text-sm font-semibold">{tab.label}</span>
              <span className="mt-0.5 text-xs text-muted-foreground">{tab.description}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
