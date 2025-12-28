import type { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create account | Make It Possible",
};

export default function SignupPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Create your workspace</CardTitle>
        <CardDescription>Plan, track, and automate missions securely.</CardDescription>
      </CardHeader>
      <CardContent>
        <SocialAuthButtons />
        <div className="relative mt-6 mb-2">
          <div className="border-t border-slate-200 dark:border-slate-700" />
          <span className="absolute inset-0 -mt-3 flex items-center justify-center bg-background text-xs uppercase text-muted-foreground">
            or continue with email
          </span>
        </div>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-brand-primary">
            Sign in
          </Link>
        </p>
      </CardContent>
    </>
  );
}
