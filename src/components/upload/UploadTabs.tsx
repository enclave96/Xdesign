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
    icon: <Gallery {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  },
  {
    id: "url",
    label: "Website",
    description: "Live URL capture",
    icon: <Global {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  },
  {
    id: "figma",
    label: "Figma",
    description: "Frame export",
    icon: <PenTool {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
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
        className="flex h-auto w-full flex-col gap-1.5 sm:flex-row sm:gap-1"
        aria-label="Upload method"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              "flex h-auto flex-1 flex-col items-center px-4 py-3.5 text-center"
            )}
          >
            <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-sm bg-muted text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {tab.icon}
            </span>
            <span className="text-sm font-semibold">{tab.label}</span>
            <span className="mt-0.5 text-xs text-muted-foreground">{tab.description}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
