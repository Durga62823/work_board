"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types/action";
import { revalidatePath } from "next/cache";

interface UpdateOrganizationSettingsData {
  timeZone?: string;
  workWeek?: string;
  workHoursStart?: string;
  workHoursEnd?: string;
  holidays?: string;
  aiEnabled?: boolean;
  aiThreshold?: number;
}

export async function getOrganizationSettings() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    // Get or create default settings
    let settings = await prisma.organizationSettings.findFirst();

    if (!settings) {
      settings = await prisma.organizationSettings.create({
        data: {},
      });
    }

    return settings;
  } catch (error) {
    console.error("Get organization settings error:", error);
    return null;
  }
}

export async function updateOrganizationSettings(
  data: UpdateOrganizationSettingsData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Get or create settings
    let settings = await prisma.organizationSettings.findFirst();

    if (!settings) {
      settings = await prisma.organizationSettings.create({
        data: {},
      });
    }

    // Update settings
    await prisma.organizationSettings.update({
      where: { id: settings.id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "SETTINGS_UPDATED",
        entity: "OrganizationSettings",
        entityId: settings.id,
        details: "Updated organization settings",
      },
    });

    revalidatePath("/admin/settings");
    return { success: true, message: "Settings updated successfully" };
  } catch (error) {
    console.error("Update organization settings error:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

interface UpdateIntegrationData {
  name: string;
  enabled: boolean;
  config?: string;
}

export async function updateIntegration(data: UpdateIntegrationData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const integration = await prisma.integration.upsert({
      where: { name: data.name },
      update: {
        enabled: data.enabled,
        config: data.config,
      },
      create: {
        name: data.name,
        type: data.name.toLowerCase(),
        enabled: data.enabled,
        config: data.config,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: data.enabled ? "INTEGRATION_ENABLED" : "INTEGRATION_DISABLED",
        entity: "Integration",
        entityId: integration.id,
        details: `${data.enabled ? "Enabled" : "Disabled"} ${data.name} integration`,
      },
    });

    revalidatePath("/admin/integrations");
    return { success: true, message: "Integration updated successfully" };
  } catch (error) {
    console.error("Update integration error:", error);
    return { success: false, error: "Failed to update integration" };
  }
}

export async function getAllIntegrations() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const integrations = await prisma.integration.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return integrations;
  } catch (error) {
    console.error("Get integrations error:", error);
    return null;
  }
}
