"use client";

import { Logout, ProfileCircle, Setting2 } from "iconsax-reactjs";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { iconProps } from "@/components/icons";
import type { User } from "@/lib/api";

export interface UserMenuProps {
  user: User;
  onLogout: () => void;
  /** Compact trigger for sidebar footer */
  compact?: boolean;
}

function getInitials(user: User): string {
  return (user.name ?? user.email ?? "X")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function UserMenu({ user, onLogout, compact = false }: UserMenuProps) {
  const initials = getInitials(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={
            compact
              ? "group flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left transition-colors hover:bg-white/50 focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
              : "flex items-center gap-2 rounded-[var(--radius-full)] p-0.5 transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
          }
          aria-label="Open account menu"
        >
          <Avatar className={compact ? "h-9 w-9" : undefined}>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {compact ? (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]">
                {user.name ?? "Your account"}
              </span>
              <span className="block truncate text-[var(--text-xs)] text-[var(--color-text-muted)]">
                {user.email}
              </span>
            </span>
          ) : (
            <span className="hidden text-right sm:block">
              <span className="block max-w-32 truncate text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]">
                {user.name ?? "Your account"}
              </span>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={compact ? "start" : "end"} side={compact ? "top" : "bottom"}>
        <DropdownMenuLabel>
          <span className="block text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
            {user.name ?? "Your account"}
          </span>
          <span className="mt-0.5 block truncate text-[var(--text-xs)] font-[var(--font-weight-normal)]">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ProfileCircle {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Setting2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
          Preferences
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => onLogout()}
          className="text-[var(--color-severity-critical)] focus:text-[var(--color-severity-critical)]"
        >
          <Logout {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
