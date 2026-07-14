"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassField } from "@/components/ui/GlassField";
import { GlassAlert } from "@/components/ui/GlassAlert";
import { useAuth, getAuthErrorMessage } from "@/hooks/useAuth";
import { XdesignLogo } from "@/components/brand/XdesignLogo";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name || undefined);
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
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex transition-opacity hover:opacity-80">
            <XdesignLogo markClassName="h-11 w-11" className="gap-3" />
          </Link>
        </div>

        <GlassCard
          title="Create your account"
          description="Start analyzing designs in minutes"
          variant="elevated"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <GlassAlert variant="error">{error}</GlassAlert>}

            <GlassField label="Name" htmlFor="name" optional>
              <GlassInput
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Designer"
                leftIcon={<User className="h-4 w-4" strokeWidth={1.75} />}
              />
            </GlassField>

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

            <GlassField label="Password" htmlFor="password" hint="At least 8 characters">
              <GlassInput
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
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
              Create account
            </GlassButton>
          </form>

          <p className="mt-6 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-[var(--font-weight-semibold)] text-[var(--color-text-accent)] hover:text-[var(--color-purple-600)]"
            >
              Sign in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
