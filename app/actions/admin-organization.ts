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

export async function getDepartmentById(departmentId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        teams: {
          include: {
            _count: {
              select: {
                users: true,
                projects: true,
              },
            },
          },
        },
        users: {
          include: {
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            firstName: "asc",
          },
        },
      },
    });

    return department;
  } catch (error) {
    console.error("Get department by ID error:", error);
    return null;
  }
}

export async function getTeamById(teamId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        department: true,
        users: {
          include: {
            manager: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: {
            firstName: "asc",
          },
        },
        projects: {
          include: {
            _count: {
              select: {
                members: true,
                tasks: true,
              },
            },
          },
        },
      },
    });

    return team;
  } catch (error) {
    console.error("Get team by ID error:", error);
    return null;
  }
}

interface UpdateDepartmentData {
  id: string;
  name?: string;
  description?: string;
  headId?: string | null;
}

export async function updateDepartment(data: UpdateDepartmentData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const department = await prisma.department.update({
      where: { id: data.id },
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
        details: `Updated department ${department.name}`,
      },
    });

    revalidatePath("/admin/departments");
    revalidatePath(`/admin/departments/${data.id}`);
    return { success: true, message: "Department updated successfully" };
  } catch (error) {
    console.error("Update department error:", error);
    return { success: false, error: "Failed to update department" };
  }
}

export async function deleteDepartment(departmentId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if department has users
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
      },
    });

    if (!department) {
      return { success: false, error: "Department not found" };
    }

    if (department._count.users > 0) {
      return { success: false, error: "Cannot delete department with assigned users" };
    }

    if (department._count.teams > 0) {
      return { success: false, error: "Cannot delete department with teams" };
    }

    await prisma.department.delete({
      where: { id: departmentId },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "SETTINGS_UPDATED",
        entity: "Department",
        entityId: departmentId,
        details: `Deleted department ${department.name}`,
      },
    });

    revalidatePath("/admin/departments");
    return { success: true, message: "Department deleted successfully" };
  } catch (error) {
    console.error("Delete department error:", error);
    return { success: false, error: "Failed to delete department" };
  }
}

interface UpdateTeamData {
  id: string;
  name?: string;
  description?: string;
  departmentId?: string;
  leadId?: string | null;
}

export async function updateTeam(data: UpdateTeamData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const team = await prisma.team.update({
      where: { id: data.id },
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
        details: `Updated team ${team.name}`,
      },
    });

    revalidatePath("/admin/teams");
    return { success: true, message: "Team updated successfully" };
  } catch (error) {
    console.error("Update team error:", error);
    return { success: false, error: "Failed to update team" };
  }
}

export async function deleteTeam(teamId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if team has users
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
    });

    if (!team) {
      return { success: false, error: "Team not found" };
    }

    if (team._count.users > 0) {
      return { success: false, error: "Cannot delete team with assigned users" };
    }

    if (team._count.projects > 0) {
      return { success: false, error: "Cannot delete team with projects" };
    }

    await prisma.team.delete({
      where: { id: teamId },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "SETTINGS_UPDATED",
        entity: "Team",
        entityId: teamId,
        details: `Deleted team ${team.name}`,
      },
    });

    revalidatePath("/admin/teams");
    return { success: true, message: "Team deleted successfully" };
  } catch (error) {
    console.error("Delete team error:", error);
    return { success: false, error: "Failed to delete team" };
  }
}
