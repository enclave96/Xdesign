"use client";

import { AppShell } from "@/components/layout/AppShell";
import { GlassButton } from "@/components/ui/GlassButton";
import { useRequireAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Upload", href: "/upload" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useRequireAuth();

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
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-[var(--text-sm)] text-[var(--color-text-secondary)] sm:inline">
            {user.name ?? user.email}
          </span>
          <GlassButton variant="ghost" size="sm" onClick={() => logout()}>
            Log out
          </GlassButton>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
