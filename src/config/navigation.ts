export interface NavLink {
  label: string;
  href: string;
  badge?: string;
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
  { label: "Overview", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard" },
  { label: "Reports", href: "/dashboard" },
  { label: "Compare", href: "/dashboard" },
  { label: "Team", href: "/dashboard" },
  { label: "Settings", href: "/dashboard" },
];
