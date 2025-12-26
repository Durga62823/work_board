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
    <div className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-destructive shadow-lg">
              <Shield className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
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
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>

        <Card className="border-border bg-card backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Activity</CardTitle>
                <CardDescription className="text-base">
                  Showing {logs.length} of {total} total log entries
                </CardDescription>
              </div>
              <Shield className="h-8 w-8 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
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
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
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
                          <Badge variant="outline" className="border-destructive/50 text-destructive">
                            {log.action.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.entity}</TableCell>
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
