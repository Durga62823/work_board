import "server-only";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import EmailVerification from "@/emails/EmailVerification";
import PasswordReset from "@/emails/PasswordReset";
import WelcomeEmail from "@/emails/Welcome";

const getFromAddress = () => {
  if (!process.env.SMTP_USER) {
    return process.env.SMTP_FROM;
  }

  return `WorkBoard <${process.env.SMTP_USER}>`;
};

let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (!transporter) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured - emails will be logged to console");
      return null;
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

type EmailParams = {
  email: string;
  token: string;
  firstName?: string | null;
};

export async function sendVerificationEmail({ email, token, firstName }: EmailParams) {
  const smtp = getTransporter();

  if (!smtp) {
    console.log(`[DEV] Verification OTP for ${email}: ${token}`);
    return;
  }

  try {
    const html = render(
      <EmailVerification firstName={firstName} otpCode={token} />,
    );

    const result = await smtp.sendMail({
      from: getFromAddress(),
      to: email,
      subject: "Verify your WorkBoard account",
      html,
    });

    console.log(`✓ Verification email sent to ${email}:`, result.messageId);
  } catch (error) {
    console.error(`✗ Failed to send verification email to ${email}:`, error);
    throw error;
  }
}

export async function sendPasswordResetEmail({ email, token, firstName }: EmailParams) {
  const smtp = getTransporter();

  if (!smtp) {
    console.log(`[DEV] Password reset OTP for ${email}: ${token}`);
    return;
  }

  try {
    const html = render(<PasswordReset firstName={firstName} otpCode={token} />);

    const result = await smtp.sendMail({
      from: getFromAddress(),
      to: email,
      subject: "Reset your WorkBoard password",
      html,
    });

    console.log(`✓ Password reset email sent to ${email}:`, result.messageId);
  } catch (error) {
    console.error(`✗ Failed to send password reset email to ${email}:`, error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, firstName?: string | null) {
  const smtp = getTransporter();

  if (!smtp) {
    console.log(`[DEV] Welcome email for ${email}`);
    return;
  }

  try {
    const html = render(<WelcomeEmail firstName={firstName} />);

    const result = await smtp.sendMail({
      from: getFromAddress(),
      to: email,
      subject: "Welcome to WorkBoard",
      html,
    });

    console.log(`✓ Welcome email sent to ${email}:`, result.messageId);
  } catch (error) {
    console.error(`✗ Failed to send welcome email to ${email}:`, error);
    throw error;
  }
}
