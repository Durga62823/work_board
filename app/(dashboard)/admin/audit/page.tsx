import { redirect } from "next/navigation";
import { Download, Shield } from "lucide-react";

import { auth } from "@/lib/auth";
import { getAuditLogs } from "@/app/actions/admin-audit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">
            Track all administrative actions and security events
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Showing {logs.length} of {total} total log entries
              </CardDescription>
            </div>
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
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
                              <div className="text-muted-foreground">{log.user.email}</div>
                            </>
                          ) : (
                            <span className="text-muted-foreground">System</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {log.action.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.entity}</TableCell>
                      <TableCell className="max-w-md truncate text-sm">
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
  );
}
