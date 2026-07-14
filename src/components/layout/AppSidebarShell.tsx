"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Category2,
  Chart,
  DocumentText,
  DocumentUpload,
  Element3,
  HamburgerMenu,
  Link2,
  People,
  Setting2,
} from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { XdesignLogo } from "@/components/brand/XdesignLogo";
import { AppTopNav } from "@/components/layout/AppTopNav";
import { iconProps } from "@/components/icons";
import type { NavItem } from "./AppShell";

export interface AppSidebarShellProps {
  children: ReactNode;
  navItems: NavItem[];
  footer?: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

const defaultIcons: Record<string, ReactNode> = {
  "/dashboard": <Category2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  "/upload": <DocumentUpload {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Projects: <Element3 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Reports: <DocumentText {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Compare: <Chart {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Team: <People {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Integrations: <Link2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  Settings: <Setting2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
};

function getNavIcon(item: NavItem) {
  if (item.icon) return item.icon;
  return defaultIcons[item.href] ?? defaultIcons[item.label] ?? defaultIcons["/dashboard"];
}

export function AppSidebarShell({
  children,
  navItems,
  footer,
  headerActions,
  className,
}: AppSidebarShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="border-b px-5 py-5">
        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
          <XdesignLogo markClassName="h-8 w-auto rounded-md" />
        </Link>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-brand-gradient text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-sm",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                {getNavIcon(item)}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] font-semibold uppercase tracking-wide"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {footer && <div className="border-t p-3">{footer}</div>}
    </>
  );

  return (
    <div className={cn("relative min-h-screen bg-muted/20", className)}>
      <header className="sticky top-0 z-50 border-b bg-background px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard">
            <XdesignLogo markClassName="h-7 w-auto rounded-md" />
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <HamburgerMenu {...iconProps("md", undefined, "Linear", { interactive: false })} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="relative flex min-h-screen lg:min-h-0">
        <aside className="fixed inset-y-0 left-0 z-[60] hidden w-64 border-r bg-card lg:flex">
          <div className="flex h-full w-full flex-col">{sidebarContent}</div>
        </aside>

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-[70] w-72 border-r bg-card shadow-lg transition-transform duration-200 lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full w-full flex-col">{sidebarContent}</div>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col lg:pl-64">
          <AppTopNav actions={headerActions} />
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
