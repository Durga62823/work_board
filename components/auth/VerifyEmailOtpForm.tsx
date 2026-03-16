"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { resendVerificationEmail, verifyEmailOtp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyEmailOtpSchema, type VerifyEmailOtpInput } from "@/lib/validations/auth";

interface VerifyEmailOtpFormProps {
  defaultEmail?: string;
  defaultOtp?: string;
}

export function VerifyEmailOtpForm({ defaultEmail, defaultOtp }: VerifyEmailOtpFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyEmailOtpInput>({
    resolver: zodResolver(verifyEmailOtpSchema),
    defaultValues: {
      email: defaultEmail ?? "",
      otp: defaultOtp ?? "",
    },
  });

  const email = watch("email", defaultEmail ?? "");

  const onSubmit = (values: VerifyEmailOtpInput) => {
    startTransition(async () => {
      const result = await verifyEmailOtp(values);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message ?? "Email verified");
      router.push("/auth/login");
    });
  };

  const onResend = () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    startResendTransition(async () => {
      const result = await resendVerificationEmail(email);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message ?? "Verification OTP sent");
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="otp">OTP code</Label>
        <Input id="otp" inputMode="numeric" maxLength={6} placeholder="123456" {...register("otp")} />
        {errors.otp && <p className="text-sm text-destructive">{errors.otp.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Verifying..." : "Verify email"}
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={onResend} disabled={isResending}>
        {isResending ? "Sending OTP..." : "Resend OTP"}
      </Button>
    </form>
  );
}
