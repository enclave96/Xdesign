"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category2, DocumentUpload, HamburgerMenu } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
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
      <div className="border-b px-5 py-5">
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
                "group flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-sm",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                {item.icon ?? defaultIcons[item.href]}
              </span>
              {item.label}
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
            <XdesignLogo markClassName="h-7 w-auto" />
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
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
