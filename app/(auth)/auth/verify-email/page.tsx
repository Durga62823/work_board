import type { Metadata } from "next";

import { EmailVerificationNotice } from "@/components/auth/EmailVerificationNotice";
import { VerifyEmailOtpForm } from "@/components/auth/VerifyEmailOtpForm";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verify email | Make It Possible",
};

interface VerifyEmailPageProps {
  searchParams?: Promise<{ email?: string; otp?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <>
      <CardHeader>
        <CardTitle>Check your inbox</CardTitle>
        <CardDescription>We just sent you a verification OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <EmailVerificationNotice email={params?.email} />
        <div className="mt-6">
          <VerifyEmailOtpForm defaultEmail={params?.email} defaultOtp={params?.otp} />
        </div>
      </CardContent>
    </>
  );
}
