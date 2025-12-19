import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Authentication Error | Make It Possible",
};

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  let errorMessage = "An error occurred during authentication.";
  let errorDetails =
    "Please try again or contact support if the problem persists.";

  if (error === "OAuthAccountNotLinked") {
    errorMessage = "Account Already Exists";
    errorDetails =
      "An account with this email already exists. Please sign in with your email and password instead of using social login, or use a different email address for social authentication.";
  }

  return (
    <>
      <CardHeader>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <CardTitle className="text-center">{errorMessage}</CardTitle>
        <CardDescription className="text-center">
          {errorDetails}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="flex w-full items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
          >
            Back to Login
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-brand-primary"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </CardContent>
    </>
  );
}
