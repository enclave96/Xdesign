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
              ? "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              : "flex items-center gap-2 rounded-full p-0.5 transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          }
          aria-label="Open account menu"
        >
          <Avatar className={compact ? "h-9 w-9" : undefined}>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {compact ? (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {user.name ?? "Your account"}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </span>
          ) : (
            <span className="hidden text-right sm:block">
              <span className="block max-w-32 truncate text-sm font-medium text-foreground">
                {user.name ?? "Your account"}
              </span>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={compact ? "start" : "end"} side={compact ? "top" : "bottom"}>
        <DropdownMenuLabel>
          <span className="block text-sm font-semibold text-foreground">
            {user.name ?? "Your account"}
          </span>
          <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
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
          className="text-destructive focus:text-destructive"
        >
          <Logout {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
