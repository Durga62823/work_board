"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types/action";

interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  departmentId?: string;
  teamId?: string;
  managerId?: string;
  position?: string;
  phoneNumber?: string;
}

interface UpdateUserData {
  id: string;
  firstName?: string;
  lastName?: string;
  role?: "ADMIN" | "MANAGER" | "EMPLOYEE";
  departmentId?: string | null;
  teamId?: string | null;
  managerId?: string | null;
  position?: string;
  phoneNumber?: string;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export async function createUser(data: CreateUserData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return { success: false, error: "Insufficient permissions" };
    // }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
        departmentId: data.departmentId,
        teamId: data.teamId,
        managerId: data.managerId,
        position: data.position,
        phoneNumber: data.phoneNumber,
        emailVerified: new Date(), // Admin-created users are pre-verified
        status: "ACTIVE",
      },
    });

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_CREATED",
        entity: "User",
        entityId: user.id,
        details: `Created user ${user.email} with role ${user.role}`,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Create user error:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUser(data: UpdateUserData): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return { success: false, error: "Insufficient permissions" };
    // }

    const user = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
        role: data.role,
        departmentId: data.departmentId,
        teamId: data.teamId,
        managerId: data.managerId,
        position: data.position,
        phoneNumber: data.phoneNumber,
        status: data.status,
      },
    });

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_UPDATED",
        entity: "User",
        entityId: updatedUser.id,
        details: `Updated user ${updatedUser.email}`,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deactivateUser(userId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return { success: false, error: "Insufficient permissions" };
    // }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: "INACTIVE" },
    });

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_DEACTIVATED",
        entity: "User",
        entityId: user.id,
        details: `Deactivated user ${user.email}`,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User deactivated successfully" };
  } catch (error) {
    console.error("Deactivate user error:", error);
    return { success: false, error: "Failed to deactivate user" };
  }
}

export async function deleteUser(userId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return { success: false, error: "Insufficient permissions" };
    // }

    // Prevent self-deletion
    if (session.user.id === userId) {
      return { success: false, error: "Cannot delete your own account" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_DELETED",
        entity: "User",
        entityId: userId,
        details: `Deleted user ${user.email}`,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function getAllUsers() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return null;
    // }

    const users = await prisma.user.findMany({
      include: {
        department: true,
        team: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            employees: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Get all users error:", error);
    return null;
  }
}

export async function getUserById(userId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    // TODO: Check admin role after migration
    // if (session.user.role !== "ADMIN") {
    //   return null;
    // }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        department: true,
        team: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        employees: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
          },
        },
        accounts: true,
        performanceMetrics: {
          take: 10,
          orderBy: {
            recordedAt: "desc",
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
}
