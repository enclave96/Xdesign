"use client";

import type { ReactNode } from "react";
import {
  ArrowSwapHorizontal,
  Category2,
  DocumentText,
  DocumentUpload,
  Element3,
  Link2,
  People,
  Setting2,
  TrendUp,
} from "iconsax-reactjs";
import { iconProps } from "@/components/icons";

export type AppNavIconKey =
  | "overview"
  | "analytics"
  | "reports"
  | "compare"
  | "team"
  | "settings"
  | "dashboard"
  | "upload"
  | "projects"
  | "integrations";

export function appNavIcon(key: AppNavIconKey, isActive = false): ReactNode {
  const props = iconProps("sm", undefined, "Linear", {
    tone: isActive ? "light" : "inherit",
    interactive: false,
  });

  const icons: Record<AppNavIconKey, ReactNode> = {
    overview: <Element3 {...props} />,
    analytics: <TrendUp {...props} />,
    reports: <DocumentText {...props} />,
    compare: <ArrowSwapHorizontal {...props} />,
    team: <People {...props} />,
    settings: <Setting2 {...props} />,
    dashboard: <Category2 {...props} />,
    upload: <DocumentUpload {...props} />,
    projects: <Element3 {...props} />,
    integrations: <Link2 {...props} />,
  };

  return icons[key];
}

export function isAppNavIconKey(value: string): value is AppNavIconKey {
  return value in {
    overview: true,
    analytics: true,
    reports: true,
    compare: true,
    team: true,
    settings: true,
    dashboard: true,
    upload: true,
    projects: true,
    integrations: true,
  };
}
