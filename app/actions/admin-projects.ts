"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types/action";

export async function getAllProjects() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        team: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Get projects error:", error);
    return null;
  }
}

export async function getProjectStats() {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const [total, onTrack, atRisk, delayed, completed] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "ON_TRACK" } }),
      prisma.project.count({ where: { status: "AT_RISK" } }),
      prisma.project.count({ where: { status: "DELAYED" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
    ]);

    return { total, onTrack, atRisk, delayed, completed };
  } catch (error) {
    console.error("Get project stats error:", error);
    return null;
  }
}
