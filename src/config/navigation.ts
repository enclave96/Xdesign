export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  icon?: string;
}

/** Landing / marketing header — UpTier-style breadth */
export const marketingNav: NavLink[] = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Reports", href: "#reports" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
];

export const marketingFooterNav = {
  main: [
    { label: "Home", href: "/" },
    { label: "Platform", href: "#platform" },
    { label: "Solutions", href: "#solutions" },
    { label: "Success Stories", href: "#stories" },
    { label: "Pricing", href: "#pricing" },
  ],
  resources: [
    { label: "Blog", href: "#resources" },
    { label: "Help Center", href: "#faq" },
    { label: "Compare", href: "#compare" },
    { label: "Guides", href: "#resources" },
  ],
  company: [
    { label: "About", href: "#platform" },
    { label: "Contact", href: "#pricing" },
  ],
};

/** App sidebar — primary workspace sections */
export const appSidebarNav: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "New Analysis", href: "/upload" },
  { label: "Projects", href: "/dashboard" },
  { label: "Reports", href: "/dashboard", badge: "Soon" },
  { label: "Compare", href: "/dashboard", badge: "Soon" },
  { label: "Team", href: "/dashboard", badge: "Soon" },
  { label: "Integrations", href: "/dashboard", badge: "Soon" },
  { label: "Settings", href: "/dashboard", badge: "Soon" },
];

/** App top bar — secondary horizontal nav (desktop) */
export const appTopNav: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Analytics", href: "/dashboard", icon: "analytics" },
  { label: "Reports", href: "/dashboard", icon: "reports" },
  { label: "Compare", href: "/dashboard", icon: "compare" },
  { label: "Team", href: "/dashboard", icon: "team" },
  { label: "Settings", href: "/dashboard", icon: "settings" },
];
