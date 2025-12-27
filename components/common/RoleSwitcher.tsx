"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiShieldCheck } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function RoleSwitcher({ currentRole }: { currentRole: string }) {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRoleChange = async () => {
    if (selectedRole === currentRole) {
      setMessage("Role is already set to " + selectedRole);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Sign out and redirect to login to refresh the session
        setTimeout(async () => {
          await signOut({ redirect: false });
          router.push("/auth/login");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to update role");
        setLoading(false);
      }
    } catch (error) {
      setMessage("An error occurred");
      setLoading(false);
    }
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <HiShieldCheck className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-lg">Development: Role Switcher</CardTitle>
        </div>
        <CardDescription>
          Current role: <strong>{currentRole}</strong>. Switch roles to test different dashboards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EMPLOYEE">Employee</SelectItem>
              <SelectItem value="LEAD">Lead</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleRoleChange}
            disabled={loading || selectedRole === currentRole}
          >
            {loading ? (
              <>
                <ImSpinner2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Switch Role"
            )}
          </Button>
        </div>
        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-amber-600"}`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
