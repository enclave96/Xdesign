"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassField } from "@/components/ui/GlassField";
import { GlassAlert } from "@/components/ui/GlassAlert";
import { useAuth, getAuthErrorMessage } from "@/hooks/useAuth";
import { XdesignLogo } from "@/components/brand/XdesignLogo";

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
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-blue-200)] opacity-35 blur-3xl animate-float-soft" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-30 blur-3xl" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--color-blue-300)] opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex transition-opacity hover:opacity-80">
            <XdesignLogo markClassName="h-12 w-12" />
          </Link>
        </div>

        <GlassCard title="Welcome back" description="Sign in to your account" variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <GlassAlert variant="error">{error}</GlassAlert>}

            <GlassField label="Email" htmlFor="email">
              <GlassInput
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                leftIcon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
              />
            </GlassField>

            <GlassField label="Password" htmlFor="password">
              <GlassInput
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" strokeWidth={1.75} />}
              />
            </GlassField>

            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-1"
            >
              Sign in
            </GlassButton>
          </form>

          <p className="mt-6 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-[var(--font-weight-semibold)] text-[var(--color-text-accent)] hover:text-[var(--color-purple-600)]"
            >
              Create one
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
