"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth, getAuthErrorMessage } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-blue-200)] opacity-30 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-25 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--gradient-accent)] shadow-[var(--shadow-glass-sm)]"
            >
              <span className="text-sm font-bold text-white">X</span>
            </div>
            <span className="text-[var(--text-xl)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
              Xdesign
            </span>
          </Link>
        </div>

        <GlassCard title="Welcome back" description="Sign in to your account">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-[var(--radius-md)] border border-[var(--color-severity-critical-border)] bg-[var(--color-severity-critical-bg)] px-4 py-3 text-[var(--text-sm)] text-[var(--color-severity-critical)]"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full rounded-[var(--radius-md)] border border-[var(--glass-border)]",
                  "bg-[var(--glass-bg)] px-4 py-2.5 text-[var(--text-sm)]",
                  "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]"
                )}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full rounded-[var(--radius-md)] border border-[var(--glass-border)]",
                  "bg-[var(--glass-bg)] px-4 py-2.5 text-[var(--text-sm)]",
                  "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]"
                )}
                placeholder="••••••••"
              />
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              Sign in
            </GlassButton>
          </form>

          <p className="mt-6 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-[var(--font-weight-medium)]">
              Create one
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
