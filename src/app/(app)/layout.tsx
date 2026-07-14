"use client";

import { AppShell } from "@/components/layout/AppShell";
import { LogOut, Settings, UserRound } from "lucide-react";
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
import { useRequireAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Upload", href: "/upload" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useRequireAuth();
  const initials = (user?.name ?? user?.email ?? "X")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-purple-500)] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell
      navItems={navItems}
      headerActions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-[var(--radius-full)] p-0.5 transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
              aria-label="Open account menu"
            >
              <span className="hidden text-right sm:block">
                <span className="block max-w-32 truncate text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]">
                  {user.name ?? "Your account"}
                </span>
              </span>
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
              <UserRound className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => logout()} className="text-[var(--color-severity-critical)] focus:text-[var(--color-severity-critical)]">
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      {children}
    </AppShell>
  );
}
