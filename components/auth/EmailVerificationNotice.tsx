interface EmailVerificationNoticeProps {
  email?: string;
}

export function EmailVerificationNotice({ email }: EmailVerificationNoticeProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
      We sent a 6-digit OTP to <span className="font-medium">{email ?? "your inbox"}</span>. Enter it below to
      activate your workspace.
    </div>
  );
}
