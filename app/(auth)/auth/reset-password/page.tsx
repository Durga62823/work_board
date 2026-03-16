import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Reset password | Make It Possible",
};

interface ResetPasswordPageProps {
  searchParams?: Promise<{ email?: string; otp?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <>
      <CardHeader>
        <CardTitle>Create a new password</CardTitle>
        <CardDescription>Enter the OTP from your email and set a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm defaultEmail={params?.email} defaultOtp={params?.otp} />
      </CardContent>
    </>
  );
}
