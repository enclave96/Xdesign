"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { XdesignLogo } from "@/components/brand/XdesignLogo";

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface AppShellProps {
  children: ReactNode;
  title?: string;
  logo?: ReactNode;
  navItems?: NavItem[];
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
    <div className={cn("relative min-h-screen bg-muted/20", className)}>
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              {logo ?? <XdesignLogo />}
              {logo && (
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </span>
              )}
            </div>

            <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {headerActions && (
              <div className="flex items-center gap-2">{headerActions}</div>
            )}
          </div>
        </Card>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
