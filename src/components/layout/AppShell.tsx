"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { XdesignLogo } from "@/components/brand/XdesignLogo";

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface AppShellProps {
  children: ReactNode;
  /** Application title shown in header */
  title?: string;
  /** Logo element or image */
  logo?: ReactNode;
  /** Navigation items for the header */
  navItems?: NavItem[];
  /** Right-side header actions (user menu, settings, etc.) */
  headerActions?: ReactNode;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Analysis", href: "/analysis" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function AppShell({
  children,
  title = "Xdesign",
  logo,
  navItems = defaultNavItems,
  headerActions,
  className,
}: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Ambient background orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-blue-200)] opacity-30 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--color-blue-300)] opacity-20 blur-3xl" />
      </div>

      {/* Glass header */}
      <header className="sticky top-0 z-[var(--z-header)] px-4 pt-4 sm:px-6 lg:px-8">
        <GlassPanel
          variant="elevated"
          padding="none"
          className="mx-auto max-w-7xl"
        >
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {logo ?? <XdesignLogo />}
              {logo && (
                <span className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] tracking-tight text-[var(--color-text-primary)]">
                  {title}
                </span>
              )}
            </div>

            {/* Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 md:flex"
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center gap-2 overflow-hidden rounded-[var(--radius-md)] px-3.5 py-2",
                      "text-[var(--text-sm)] font-[var(--font-weight-medium)]",
                      "transition-all duration-[var(--transition-smooth)]",
                      "focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]",
                      isActive
                        ? "bg-[var(--glass-bg-strong)] text-[var(--color-text-primary)] shadow-[var(--shadow-glass-sm)] border border-[var(--glass-border)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--glass-bg-subtle)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header actions */}
            {headerActions && (
              <div className="flex items-center gap-2">{headerActions}</div>
            )}
          </div>
        </GlassPanel>
      </header>

      {/* Main content */}
      <main className="relative z-[var(--z-base)] mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
