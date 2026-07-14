"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AppSidebarShell } from "@/components/layout/AppSidebarShell";
import { UserMenu } from "@/components/layout/UserMenu";
import { useRequireAuth } from "@/hooks/useAuth";

const sidebarNavItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Upload", href: "/upload" },
];

const SIDEBAR_ROUTES = new Set(["/dashboard", "/upload"]);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useRequireAuth();
  const useSidebar = SIDEBAR_ROUTES.has(pathname);

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

  const userMenu = <UserMenu user={user} onLogout={logout} />;

  if (useSidebar) {
    return (
      <AppSidebarShell
        navItems={sidebarNavItems}
        footer={<UserMenu user={user} onLogout={logout} compact />}
      >
        {children}
      </AppSidebarShell>
    );
  }

  return (
    <AppShell navItems={[]} headerActions={userMenu}>
      {children}
    </AppShell>
  );
}
