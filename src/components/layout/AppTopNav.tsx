"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Notification, SearchNormal1 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { appTopNav } from "@/config/navigation";
import { iconProps } from "@/components/icons";
import { appNavIcon, isAppNavIconKey } from "@/components/icons/app-nav-icons";
import type { ReactNode } from "react";

export interface AppTopNavProps {
  actions?: ReactNode;
  className?: string;
}

export function AppTopNav({ actions, className }: AppTopNavProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:block",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-6">
        <nav aria-label="Workspace" className="flex min-w-0 items-center gap-0.5 overflow-x-auto">
          {appTopNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-brand-gradient text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon && isAppNavIconKey(item.icon)
                  ? appNavIcon(item.icon, isActive)
                  : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search"
          >
            <SearchNormal1 {...iconProps("sm", undefined, "Linear", { interactive: false })} />
          </button>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Notifications"
          >
            <Notification {...iconProps("sm", undefined, "Linear", { interactive: false })} />
          </button>
          {actions}
        </div>
      </div>
    </header>
  );
}
