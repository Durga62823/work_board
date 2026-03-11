import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsClient } from "@/components/settings/SettingsClient";

export const metadata = {
  title: "Settings | WorkBoard",
};

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Fetch user preferences and notifications from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      preferences: true,
      notificationSettings: true,
    },
  });

  const preferences = (user?.preferences as any) || {
    language: "English",
    timezone: "UTC",
  };

  const notifications = (user?.notificationSettings as any) || {
    emailNotifications: true,
    projectUpdates: true,
    teamActivity: true,
    loginAlerts: true,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your preferences, notifications, and account settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Preferences & Notifications */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg overflow-hidden">
              <SettingsClient
                initialPreferences={preferences}
                initialNotifications={notifications}
              />
            </div>
          </div>

          {/* Right Column - Account Settings */}
          <div className="border border-border rounded-lg overflow-hidden h-fit">
            <div className="bg-muted px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Account</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your account settings</p>
            </div>

            <div className="p-4 space-y-2">
              <button className="w-full px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent border border-border rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent border border-border rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download My Data
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 border border-border rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
