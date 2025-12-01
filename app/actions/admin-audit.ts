"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface GetAuditLogsParams {
  userId?: string;
  action?: string;
  entity?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export async function getAuditLogs(params: GetAuditLogsParams = {}) {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const { userId, action, entity, startDate, endDate, limit = 50, offset = 0 } = params;

    const where: any = {};

    if (userId) where.userId = userId;
    if (action) where.action = action;
    if (entity) where.entity = entity;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { logs, total, hasMore: offset + limit < total };
  } catch (error) {
    console.error("Get audit logs error:", error);
    return null;
  }
}

export async function exportAuditLogs(params: GetAuditLogsParams = {}) {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const result = await getAuditLogs({ ...params, limit: 10000 });
    if (!result) return null;

    // Log the export action
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "DATA_EXPORTED",
        entity: "AuditLog",
        details: `Exported ${result.logs.length} audit logs`,
      },
    });

    return result.logs;
  } catch (error) {
    console.error("Export audit logs error:", error);
    return null;
  }
}
