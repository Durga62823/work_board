import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Shield } from "lucide-react";

import { auth } from "@/lib/auth";
import { getAllUsers } from "@/app/actions/admin-users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const users = await getAllUsers();

  if (!users) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header with gradient badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Admin - User Management
              </h2>
              <p className="text-slate-600 mt-1">
                Manage users, roles, and permissions across your organization
              </p>
            </div>
          </div>
          <Link href="/admin/users/create">
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Main Card with Glassmorphism */}
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">All Users</CardTitle>
            <CardDescription className="text-base">
              {users.length} user{users.length !== 1 ? "s" : ""} in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 border-slate-200 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200/60 overflow-hidden bg-white/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Team</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Reports</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-red-50/50 transition-colors">
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell className="text-slate-600">{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === "ADMIN" ? "default" : "secondary"}
                            className={user.role === "ADMIN" ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" : ""}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{user.department?.name || "-"}</TableCell>
                        <TableCell className="text-slate-600">{user.team?.name || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "ACTIVE"
                                ? "default"
                                : user.status === "INACTIVE"
                                ? "secondary"
                                : "destructive"
                            }
                            className={user.status === "ACTIVE" ? "bg-green-500" : ""}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {user._count.employees}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/users/${user.id}`}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100 hover:text-red-700 transition-all"
                            >
                              View
                            </Button>
                          </Link>
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
