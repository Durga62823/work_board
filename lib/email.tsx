import { render } from "@react-email/render";
import { Resend } from "resend";

import EmailVerification from "@/emails/EmailVerification";
import PasswordReset from "@/emails/PasswordReset";
import WelcomeEmail from "@/emails/Welcome";
import { getBaseUrl } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const assertEmailConfig = () => {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.warn("Email credentials not configured - emails will be logged to console");
    return false;
  }
  return true;
};

type EmailParams = {
  email: string;
  token: string;
  firstName?: string | null;
};

export async function sendVerificationEmail({ email, token, firstName }: EmailParams) {
  const verificationUrl = `${getBaseUrl()}/auth/verify-email/${token}`;
  
  if (!assertEmailConfig() || !resend) {
    console.log(`[DEV] Verification email for ${email}:\n${verificationUrl}`);
    return;
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Verify your Make It Possible account",
      html: render(
        <EmailVerification firstName={firstName} actionUrl={verificationUrl} />,
      ),
    });
    console.log(`✓ Verification email sent to ${email}:`, result);
  } catch (error) {
    console.error(`✗ Failed to send verification email to ${email}:`, error);
    throw error;
  }
}

export async function sendPasswordResetEmail({ email, token, firstName }: EmailParams) {
  const resetUrl = `${getBaseUrl()}/auth/reset-password/${token}`;
  
  if (!assertEmailConfig() || !resend) {
    console.log(`[DEV] Password reset email for ${email}:\n${resetUrl}`);
    return;
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Reset your Make It Possible password",
      html: render(<PasswordReset firstName={firstName} actionUrl={resetUrl} />),
    });
    console.log(`✓ Password reset email sent to ${email}:`, result);
  } catch (error) {
    console.error(`✗ Failed to send password reset email to ${email}:`, error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, firstName?: string | null) {
  if (!assertEmailConfig() || !resend) {
    console.log(`[DEV] Welcome email for ${email}`);
    return;
  }
  
  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Welcome to Make It Possible",
      html: render(<WelcomeEmail firstName={firstName} />),
    });
    console.log(`✓ Welcome email sent to ${email}:`, result);
  } catch (error) {
    console.error(`✗ Failed to send welcome email to ${email}:`, error);
    throw error;
  }
}
