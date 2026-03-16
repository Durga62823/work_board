"use server";

import { addHours } from "date-fns";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { forgotPasswordSchema, resetPasswordWithOtpSchema } from "@/lib/validations/auth";
import { ActionResponse } from "@/app/actions/auth";
import { sanitizeInput } from "@/lib/utils";
import { generateOtp, hashPassword } from "@/lib/auth-utils";

export async function sendPasswordResetEmailAction(payload: unknown): Promise<ActionResponse> {
  const parsed = forgotPasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const email = sanitizeInput(parsed.data.email).toLowerCase();
  const rateLimit = await checkRateLimit(`reset:${email}`);
  if (!rateLimit.success) {
    return { success: false, error: "Please wait before trying again" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: "Account not found" };
  }

  await prisma.passwordResetToken.deleteMany({ where: { email } });
  const otp = generateOtp();
  await prisma.passwordResetToken.create({
    data: {
      email,
      token: otp,
      expires: addHours(new Date(), 1),
    },
  });

  const { sendPasswordResetEmail } = await import("@/lib/email-smtp");
  await sendPasswordResetEmail({ email, token: otp, firstName: user.firstName });
  return { success: true, message: "Password reset OTP sent" };
}

export async function resetPasswordWithOtp(payload: unknown): Promise<ActionResponse> {
  const parsed = resetPasswordWithOtpSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const email = sanitizeInput(parsed.data.email).toLowerCase();
  const otp = parsed.data.otp.trim();

  const record = await prisma.passwordResetToken.findUnique({ where: { token: otp } });
  if (!record || record.used) {
    return { success: false, error: "Invalid or used OTP" };
  }

  if (record.email !== email) {
    return { success: false, error: "Invalid OTP" };
  }

  if (record.expires < new Date()) {
    await prisma.passwordResetToken.delete({ where: { token: otp } });
    return { success: false, error: "OTP expired" };
  }

  const hashedPassword = await hashPassword(parsed.data.password);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.update({
    where: { token: otp },
    data: { used: true },
  });

  revalidatePath("/auth/login");
  return { success: true, message: "Password updated" };
}
