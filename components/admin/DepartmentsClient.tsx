"use client";

import { useState } from "react";
import { Plus, Building2, Edit, Trash2, MoreVertical } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateDepartmentDialog } from "@/components/admin/CreateDepartmentDialog";
import { EditDepartmentDialog } from "@/components/admin/EditDepartmentDialog";
import { DeleteDepartmentDialog } from "@/components/admin/DeleteDepartmentDialog";

interface DepartmentsClientProps {
  initialDepartments: any[];
}

export function DepartmentsClient({ initialDepartments }: DepartmentsClientProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editDepartment, setEditDepartment] = useState<any>(null);
  const [deleteDepartment, setDeleteDepartment] = useState<any>(null);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
            <p className="text-muted-foreground">
              Manage organizational departments and their structure
            </p>
          </div>
          <Button onClick={() => setOpenCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>

        {initialDepartments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No departments yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started by creating your first department
              </p>
              <Button onClick={() => setOpenCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Department
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {initialDepartments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <span>{dept.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1.5">
                        {dept.description || "No description"}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditDepartment(dept)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteDepartment(dept)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Teams:</span>
                      <Badge variant="secondary">{dept._count.teams}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Members:</span>
                      <Badge variant="secondary">{dept._count.users}</Badge>
                    </div>
                    <Link href={`/admin/departments/${dept.id}`}>
                      <Button variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateDepartmentDialog 
        open={openCreateDialog} 
        onOpenChange={setOpenCreateDialog}
      />

      {editDepartment && (
        <EditDepartmentDialog
          open={!!editDepartment}
          onOpenChange={(open) => !open && setEditDepartment(null)}
          department={editDepartment}
        />
      )}

      {deleteDepartment && (
        <DeleteDepartmentDialog
          open={!!deleteDepartment}
          onOpenChange={(open) => !open && setDeleteDepartment(null)}
          department={deleteDepartment}
        />
      )}
    </>
  );
}
