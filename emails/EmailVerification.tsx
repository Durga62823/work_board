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

interface EmailVerificationProps {
  firstName?: string | null;
  otpCode: string;
}

export default function EmailVerification({ firstName, otpCode }: EmailVerificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Project management Tool account</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.heading}>Confirm your email</Text>
          <Text style={styles.paragraph}>
            {firstName ? `Hi ${firstName},` : "Hello,"} thanks for creating an account with Make It
            Possible. Please verify your email to activate enterprise-grade security.
          </Text>
          <Text style={styles.codeLabel}>Your verification OTP</Text>
          <Text style={styles.code}>{otpCode}</Text>
          <Text style={styles.paragraph}>
            This OTP expires in 24 hours. If you didn't sign up, you can safely ignore this email.
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>© {new Date().getFullYear()} WorkBoard</Text>
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
    color: "#1E40AF",
    margin: "0 0 24px",
  },
  hr: { borderColor: "#e5e7eb", marginTop: "24px" },
  footer: { fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "16px" },
};
