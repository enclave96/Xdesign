"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category2, DocumentUpload, HamburgerMenu } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { XdesignLogo } from "@/components/brand/XdesignLogo";
import { iconProps } from "@/components/icons";
import type { NavItem } from "./AppShell";

export interface AppSidebarShellProps {
  children: ReactNode;
  navItems: NavItem[];
  footer?: ReactNode;
  className?: string;
}

const defaultIcons: Record<string, ReactNode> = {
  "/dashboard": <Category2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
  "/upload": <DocumentUpload {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />,
};

export function AppSidebarShell({
  children,
  navItems,
  footer,
  className,
}: AppSidebarShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="border-b border-[var(--glass-border-subtle)] px-5 py-5">
        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
          <XdesignLogo markClassName="h-8 w-auto" />
        </Link>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1.5 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-[var(--radius-md)] px-3.5 py-2.5",
                "text-[var(--text-sm)] font-[var(--font-weight-medium)] transition-all duration-[var(--transition-smooth)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]",
                isActive
                  ? "bg-[var(--gradient-primary)] text-white shadow-[var(--glow-button-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-purple-50)] hover:text-[var(--color-purple-700)]"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[var(--color-slate-100)] text-[var(--color-text-primary)] group-hover:bg-[var(--color-purple-100)] group-hover:text-[var(--color-purple-700)]"
                )}
              >
                {item.icon ?? defaultIcons[item.href]}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {footer && (
        <div className="border-t border-[var(--glass-border-subtle)] p-3">
          {footer}
        </div>
      )}
    </>
  );

  return (
    <div className={cn("relative min-h-screen", className)}>
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-blue-200)] opacity-30 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--color-blue-300)] opacity-20 blur-3xl" />
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--glass-border-subtle)] bg-[var(--glass-bg-elevated)]/80 px-4 py-3 backdrop-blur-[var(--blur-lg)] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard">
            <XdesignLogo markClassName="h-7 w-auto" />
          </Link>
          <button
            type="button"
            className="rounded-[var(--radius-md)] p-2 text-[var(--color-text-primary)] transition-colors hover:bg-white/60 hover:text-[var(--color-purple-600)] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <HamburgerMenu {...iconProps("md", undefined, "Linear", { interactive: false })} />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-[calc(var(--z-header)+1)] bg-slate-950/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="relative z-[var(--z-base)] flex min-h-screen lg:min-h-0">
        {/* Sidebar — desktop */}
        <aside className="fixed inset-y-0 left-0 z-[calc(var(--z-header)+2)] hidden w-64 lg:flex">
          <GlassPanel
            variant="elevated"
            padding="none"
            className="flex h-full w-full flex-col border-r border-[var(--glass-border)]"
          >
            {sidebarContent}
          </GlassPanel>
        </aside>

        {/* Sidebar — mobile drawer */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-[calc(var(--z-header)+3)] w-72 transition-transform duration-[var(--transition-smooth)] lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <GlassPanel
            variant="elevated"
            padding="none"
            className="flex h-full w-full flex-col shadow-[var(--shadow-glass-xl)]"
          >
            {sidebarContent}
          </GlassPanel>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col lg:pl-64">
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
