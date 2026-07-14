"use client";

import { usePathname } from "next/navigation";
import {
  Category2,
  Chart,
  DocumentText,
  DocumentUpload,
  Element3,
  Link2,
  People,
  Setting2,
} from "iconsax-reactjs";
import { AppShell } from "@/components/layout/AppShell";
import { AppSidebarShell } from "@/components/layout/AppSidebarShell";
import { AppTopNav } from "@/components/layout/AppTopNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { useRequireAuth } from "@/hooks/useAuth";
import { appSidebarNav } from "@/config/navigation";
import { iconProps } from "@/components/icons";
import type { NavItem } from "@/components/layout/AppShell";

const SIDEBAR_ROUTES = new Set(["/dashboard", "/upload"]);

const sidebarNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <Category2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} /> },
  { label: "New Analysis", href: "/upload", icon: <DocumentUpload {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} /> },
  { label: "Projects", href: "/dashboard", icon: <Element3 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} /> },
  { label: "Reports", href: "/dashboard", icon: <DocumentText {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />, badge: "Soon" },
  { label: "Compare", href: "/dashboard", icon: <Chart {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />, badge: "Soon" },
  { label: "Team", href: "/dashboard", icon: <People {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />, badge: "Soon" },
  { label: "Integrations", href: "/dashboard", icon: <Link2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />, badge: "Soon" },
  { label: "Settings", href: "/dashboard", icon: <Setting2 {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />, badge: "Soon" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useRequireAuth();
  const useSidebar = SIDEBAR_ROUTES.has(pathname);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
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
        headerActions={userMenu}
      >
        {children}
      </AppSidebarShell>
    );
  }

  return (
    <div className="relative min-h-screen bg-muted/20">
      <AppTopNav actions={userMenu} />
      <AppShell navItems={appSidebarNav}>
        {children}
      </AppShell>
    </div>
  );
}
