"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types/action";

interface CreateDepartmentData {
  name: string;
  description?: string;
  headId?: string;
}

export async function createDepartment(data: CreateDepartmentData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const department = await prisma.department.create({
      data: {
        name: data.name,
        description: data.description,
        headId: data.headId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "SETTINGS_UPDATED",
        entity: "Department",
        entityId: department.id,
        details: `Created department ${department.name}`,
      },
    });

    revalidatePath("/admin/departments");
    return { success: true, message: "Department created successfully" };
  } catch (error) {
    console.error("Create department error:", error);
    return { success: false, error: "Failed to create department" };
  }
}

export async function getAllDepartments() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const departments = await prisma.department.findMany({
      include: {
        teams: true,
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return departments;
  } catch (error) {
    console.error("Get departments error:", error);
    return null;
  }
}

interface CreateTeamData {
  name: string;
  description?: string;
  departmentId: string;
  leadId?: string;
}

export async function createTeam(data: CreateTeamData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const team = await prisma.team.create({
      data: {
        name: data.name,
        description: data.description,
        departmentId: data.departmentId,
        leadId: data.leadId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "SETTINGS_UPDATED",
        entity: "Team",
        entityId: team.id,
        details: `Created team ${team.name}`,
      },
    });

    revalidatePath("/admin/teams");
    return { success: true, message: "Team created successfully" };
  } catch (error) {
    console.error("Create team error:", error);
    return { success: false, error: "Failed to create team" };
  }
}

export async function getAllTeams() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const teams = await prisma.team.findMany({
      include: {
        department: true,
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return teams;
  } catch (error) {
    console.error("Get teams error:", error);
    return null;
  }
}
