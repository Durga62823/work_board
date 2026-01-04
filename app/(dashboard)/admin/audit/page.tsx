import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAuditLogs } from "@/app/actions/admin-audit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AuditLogsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const result = await getAuditLogs({ limit: 100 });

  if (!result) {
    return <div>Unauthorized</div>;
  }

  const { logs, total } = result;

  return (
    <div className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                Admin - Audit Logs
              </h2>
              <p className="text-muted-foreground mt-1">
                Track all administrative actions and security events
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-border hover:bg-muted hover:text-foreground transition-all"
          >
            ↓ Export Logs
          </Button>
        </div>

        <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-primary">Recent Activity</CardTitle>
                <CardDescription className="text-base">
                  Showing {logs.length} of {total} total log entries
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted/80">
                    <TableHead className="font-semibold">Timestamp</TableHead>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                    <TableHead className="font-semibold">Entity</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                    <TableHead className="font-semibold">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-primary"
                      >
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow
                        key={log.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="text-sm">
                          {new Date(log.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {log.user ? (
                              <>
                                <div className="font-medium">
                                  {log.user.firstName} {log.user.lastName}
                                </div>
                                <div className="text-muted-foreground">
                                  {log.user.email}
                                </div>
                              </>
                            ) : (
                              <span className="text-muted-foreground">
                                System
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-destructive/50 text-destructive"
                          >
                            {log.action.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {log.entity}
                        </TableCell>
                        <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                          {log.details || "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.ipAddress || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

