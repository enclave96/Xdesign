"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock, Message, User } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/SectionCard";
import { InputGroup } from "@/components/ui/InputGroup";
import { FormField } from "@/components/ui/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, getAuthErrorMessage } from "@/hooks/useAuth";
import { XdesignLogo } from "@/components/brand/XdesignLogo";
import { iconProps } from "@/components/icons";

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
    <div className="relative flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex transition-opacity hover:opacity-80">
            <XdesignLogo markClassName="h-10 w-auto" />
          </Link>
        </div>

        <SectionCard
          title="Create your account"
          description="Start analyzing designs in minutes"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField label="Name" htmlFor="name" optional>
              <InputGroup
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Designer"
                leftIcon={<User {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />}
              />
            </FormField>

            <FormField label="Email" htmlFor="email">
              <InputGroup
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                leftIcon={<Message {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />}
              />
            </FormField>

            <FormField label="Password" htmlFor="password" hint="At least 8 characters">
              <InputGroup
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock {...iconProps("sm", undefined, "Linear", { tone: "inherit", interactive: false })} />}
              />
            </FormField>

            <Button type="submit" size="lg" className="mt-1 w-full" loading={loading}>
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
