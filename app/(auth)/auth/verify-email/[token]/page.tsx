import { redirect } from "next/navigation";

interface VerifyEmailTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function VerifyEmailTokenPage({ params }: VerifyEmailTokenPageProps) {
  const { token } = await params;
  redirect(`/auth/verify-email?otp=${encodeURIComponent(token)}`);
}
