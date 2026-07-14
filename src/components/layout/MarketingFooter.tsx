import Link from "next/link";
import { marketingFooterNav } from "@/config/navigation";
import { XdesignLogo } from "@/components/brand/XdesignLogo";

export function MarketingFooter() {
  return (
    <footer className="relative z-10 border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <XdesignLogo markClassName="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered UX analysis for teams who ship better interfaces, faster.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Main</h3>
            <ul className="mt-4 space-y-2.5">
              {marketingFooterNav.main.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {marketingFooterNav.resources.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {marketingFooterNav.company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/register" className="text-sm font-semibold text-primary hover:underline">
                Sign up free
              </Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Orbital. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#faq" className="hover:text-primary">Privacy</a>
            <a href="#faq" className="hover:text-primary">Terms</a>
            <a href="#faq" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
