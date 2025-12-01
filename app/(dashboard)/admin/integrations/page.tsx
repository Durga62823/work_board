import { redirect } from "next/navigation";
import { Github, Slack, Mail, Key, Zap } from "lucide-react";

import { auth } from "@/lib/auth";
import { getAllIntegrations } from "@/app/actions/admin-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const integrationIcons: Record<string, any> = {
  github: Github,
  slack: Slack,
  email: Mail,
  sso: Key,
  ai: Zap,
};

export default async function IntegrationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const integrations = await getAllIntegrations();

  // Default integrations if none exist
  const defaultIntegrations = [
    { name: "GitHub", type: "github", enabled: false, description: "Connect GitHub repositories for project tracking" },
    { name: "Slack", type: "slack", enabled: false, description: "Team communication and notifications" },
    { name: "Microsoft Teams", type: "teams", enabled: false, description: "Collaboration and chat integration" },
    { name: "Email", type: "email", enabled: true, description: "Email notifications and alerts" },
    { name: "SSO", type: "sso", enabled: false, description: "Single Sign-On authentication" },
    { name: "AI Assistant", type: "ai", enabled: true, description: "AI-powered suggestions and automation" },
  ];

  const displayIntegrations = integrations && integrations.length > 0 
    ? integrations.map(i => ({
        name: i.name,
        type: i.type,
        enabled: i.enabled,
        description: `Integration for ${i.name}`,
      }))
    : defaultIntegrations;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">
          Connect external services and configure integrations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayIntegrations.map((integration) => {
          const Icon = integrationIcons[integration.type] || Zap;
          
          return (
            <Card key={integration.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8" />
                  <Badge variant={integration.enabled ? "default" : "secondary"}>
                    {integration.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={integration.enabled ? "outline" : "default"} 
                  className="w-full"
                >
                  {integration.enabled ? "Configure" : "Enable"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
