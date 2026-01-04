"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

import { deleteTeam } from "@/app/actions/admin-organization";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: {
    id: string;
    name: string;
  };
}

export function DeleteTeamDialog({ open, onOpenChange, team }: DeleteTeamDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteTeam(team.id);
      
      if (result.success) {
        toast.success(result.message || "Team deleted successfully");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{team.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            🗑️ Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
