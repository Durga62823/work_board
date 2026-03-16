import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface PasswordResetProps {
  firstName?: string | null;
  otpCode: string;
}

export default function PasswordReset({ firstName, otpCode }: PasswordResetProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Project Management tool password</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.heading}>Password reset requested</Text>
          <Text style={styles.paragraph}>
            {firstName ? `Hi ${firstName},` : "Hello,"} we received a request to reset your password. Use the
            OTP below to create a new one. This OTP expires in 60 minutes.
          </Text>
          <Text style={styles.codeLabel}>Your password reset OTP</Text>
          <Text style={styles.code}>{otpCode}</Text>
          <Text style={styles.paragraph}>
            Didn't request this? You can ignore this email and your current password will stay active.
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>Need help? security@makeitpossible.com</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: { backgroundColor: "#f4f6fb", padding: "24px" },
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    fontFamily: '"Inter", Arial, sans-serif',
  },
  heading: { fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#111827" },
  paragraph: { fontSize: "14px", color: "#4b5563", lineHeight: "22px" },
  codeLabel: { fontSize: "13px", color: "#6b7280", marginTop: "24px", marginBottom: "8px" },
  code: {
    fontSize: "28px",
    letterSpacing: "8px",
    fontWeight: 700,
    color: "#10B981",
    margin: "0 0 24px",
  },
  hr: { borderColor: "#e5e7eb", marginTop: "24px" },
  footer: { fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "16px" },
};
