import { redirect } from "next/navigation";
import { Settings, Clock, Calendar, Globe, Bot, Shield } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header with gradient badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin - Organization Settings
            </h2>
            <p className="text-slate-600 mt-1">
              Configure global settings for your organization
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-500" />
                Time & Location
              </CardTitle>
              <CardDescription>
                Timezone and working hours configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Timezone</span>
                <Badge variant="outline" className="border-red-200 text-red-700">
                  {settings.timeZone}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Work Week</span>
                <Badge variant="outline" className="border-red-200 text-red-700">
                  {settings.workWeek}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Working Hours</span>
                <Badge variant="outline" className="border-red-200 text-red-700">
                  {settings.workHoursStart} - {settings.workHoursEnd}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-orange-500" />
                AI Features
              </CardTitle>
              <CardDescription>
                Artificial intelligence and automation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">AI Enabled</span>
                <Badge 
                  variant={settings.aiEnabled ? "default" : "secondary"}
                  className={settings.aiEnabled ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" : ""}
                >
                  {settings.aiEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">AI Threshold</span>
                <Badge variant="outline" className="border-orange-200 text-orange-700">
                  {(settings.aiThreshold * 100).toFixed(0)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-500" />
                Holidays
              </CardTitle>
              <CardDescription>
                Organizational holidays and time-off days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                {settings.holidays || "No holidays configured"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-500" />
                System Info
              </CardTitle>
              <CardDescription>
                System configuration and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-slate-600">Last Updated</span>
                <span className="text-sm text-slate-500">
                  {new Date(settings.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
