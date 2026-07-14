"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeSlash, Lock, Sms } from "iconsax-reactjs";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassAlert } from "@/components/ui/GlassAlert";
import { useAuth, getAuthErrorMessage } from "@/hooks/useAuth";
import { iconProps } from "@/components/icons";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.86-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.19 7.19 0 0 1 4.9 12c0-.79.14-1.56.37-2.28V6.63H1.29a12 12 0 0 0 0 10.74l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.63l3.98 3.09C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="#0F172A" aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-blue-200)] opacity-25 blur-3xl animate-float-soft" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-20 blur-3xl" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-[26rem]">
        <div className="rounded-[var(--radius-2xl)] border border-[var(--glass-border-subtle)] bg-white p-8 shadow-[var(--shadow-glass-xl)] sm:p-9">
          <h1 className="text-[1.6rem] font-[var(--font-weight-bold)] tracking-tight text-[var(--color-text-primary)]">
            Log In
          </h1>
          <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Welcome back to Orbital 👋
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && <GlassAlert variant="error">{error}</GlassAlert>}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
              >
                Email Address
              </label>
              <GlassInput
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                leftIcon={<Sms {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="password"
                  className="block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
                >
                  Password
                </label>
                <Link
                  href="/login"
                  className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-muted)] hover:text-[var(--color-purple-700)]"
                >
                  Forgot password
                </Link>
              </div>
              <GlassInput
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                leftIcon={<Lock {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="pointer-events-auto -m-1 rounded p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-purple-700)] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
                  >
                    {showPassword ? (
                      <EyeSlash {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
                    ) : (
                      <Eye {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />
                    )}
                  </button>
                }
              />
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="mt-1"
            >
              Login
            </GlassButton>
          </form>

          <div className="my-6 flex items-center gap-4" aria-hidden>
            <span className="h-px flex-1 bg-[var(--color-slate-200)]" />
            <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Or</span>
            <span className="h-px flex-1 bg-[var(--color-slate-200)]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              title="Coming soon"
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-slate-200)] bg-white text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] transition-all duration-[var(--transition-fast)] hover:border-[var(--color-slate-300)] hover:bg-[var(--color-slate-50)] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              title="Coming soon"
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-slate-200)] bg-white text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] transition-all duration-[var(--transition-fast)] hover:border-[var(--color-slate-300)] hover:bg-[var(--color-slate-50)] focus-visible:outline-none focus-visible:shadow-[var(--glow-focus)]"
            >
              <GithubIcon />
              Continue with Github
            </button>
          </div>

          <p className="mt-7 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-[var(--font-weight-semibold)] text-[var(--color-text-accent)] underline underline-offset-2 hover:text-[var(--color-purple-600)]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
