"use client";

import { useState } from "react";
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
      <div className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary">
                  Admin - Departments
                </h2>
                <p className="text-muted-foreground mt-1">
                  Manage organizational departments and their structure
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setOpenCreateDialog(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              + Add Department
            </Button>
          </div>

          {initialDepartments.length === 0 ? (
            <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <span className="text-4xl mb-4"></span>
                <h3 className="text-lg font-semibold mb-2">No departments yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by creating your first department
                </p>
                <Button 
                  onClick={() => setOpenCreateDialog(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  + Create Department
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {initialDepartments.map((dept) => (
                <Card 
                  key={dept.id}
                  className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          🏢 {dept.name}
                        </CardTitle>
                      <CardDescription className="mt-1.5">
                        {dept.description || "No description"}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditDepartment(dept)}>
                          ✏️ Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteDepartment(dept)}
                          className="text-destructive"
                        >
                          🗑️ Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Teams:</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {dept._count.teams}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {dept._count.users}
                        </Badge>
                      </div>
                      <Link href={`/admin/departments/${dept.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full mt-2 border-2 border-transparent hover:border-primary hover:shadow-md transition-all duration-300"
                        >
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
