import { redirect } from "next/navigation";
import { Settings, Clock, Calendar, Globe, Bot } from "lucide-react";

import { auth } from "@/lib/auth";
import { getOrganizationSettings } from "@/app/actions/admin-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const settings = await getOrganizationSettings();

  if (!settings) {
    return <div>Failed to load settings</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Organization Settings</h2>
        <p className="text-muted-foreground">
          Configure global settings for your organization
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Time & Location
            </CardTitle>
            <CardDescription>
              Timezone and working hours configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Timezone</span>
              <Badge variant="outline">{settings.timeZone}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Work Week</span>
              <Badge variant="outline">{settings.workWeek}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Working Hours</span>
              <Badge variant="outline">
                {settings.workHoursStart} - {settings.workHoursEnd}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Features
            </CardTitle>
            <CardDescription>
              Artificial intelligence and automation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">AI Enabled</span>
              <Badge variant={settings.aiEnabled ? "default" : "secondary"}>
                {settings.aiEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">AI Threshold</span>
              <Badge variant="outline">{(settings.aiThreshold * 100).toFixed(0)}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Holidays
            </CardTitle>
            <CardDescription>
              Organizational holidays and time-off days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {settings.holidays || "No holidays configured"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Info
            </CardTitle>
            <CardDescription>
              System configuration and metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">
                {new Date(settings.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
