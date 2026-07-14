import Link from "next/link";
import { ArrowRight } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { XdesignLogo } from "@/components/brand/XdesignLogo";
import { marketingNav } from "@/config/navigation";
import { iconProps } from "@/components/icons";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <XdesignLogo markClassName="h-8 w-8" />
        </Link>

        <nav aria-label="Main" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-4 xl:flex">
          {marketingNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <nav aria-label="Main mobile" className="hidden items-center gap-1 md:flex xl:hidden">
          {marketingNav.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-foreground transition-colors hover:text-primary sm:inline"
          >
            Login
          </Link>
          <Button
            href="/register"
            size="sm"
            rightIcon={
              <ArrowRight
                {...iconProps("xs", "-rotate-45", "Linear", { tone: "light", interactive: false })}
              />
            }
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
