"use client";

import { useState } from "react";
import {
  approvePTORequest,
  rejectPTORequest,
} from "@/app/actions/manager-approvals";

type PTORequest = {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string | null;
  createdAt: Date;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
};

export function PTOApprovalCard({ request }: { request: PTORequest }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = async () => {
    setIsProcessing(true);
    const result = await approvePTORequest(request.id);
    if (!result.success) {
      alert(result.error || "Failed to approve request");
    }
    setIsProcessing(false);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    setIsProcessing(true);
    const result = await rejectPTORequest(request.id, rejectionReason);
    if (result.success) {
      setShowRejectDialog(false);
      setRejectionReason("");
    } else {
      alert(result.error || "Failed to reject request");
    }
    setIsProcessing(false);
  };

  return (
    <div className="px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-medium text-foreground">
            {request.user.firstName} {request.user.lastName}
          </div>
          <div className="mt-1 text-sm text-primary">{request.user.email}</div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary">Type:</span>{" "}
              <span className="font-medium text-foreground">
                {request.type.replace(/_/g, " ")}
              </span>
            </div>
            <div>
              <span className="text-primary">Duration:</span>{" "}
              <span className="font-medium text-foreground">
                {request.days} days
              </span>
            </div>
            <div>
              <span className="text-primary">Start Date:</span>{" "}
              <span className="font-medium text-foreground">
                {new Date(request.startDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-primary">End Date:</span>{" "}
              <span className="font-medium text-foreground">
                {new Date(request.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          {request.reason && (
            <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-foreground">
              <div className="mb-1 font-medium text-primary">Reason:</div>
              {request.reason}
            </div>
          )}
        </div>
        <div className="ml-4 flex gap-2">
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => setShowRejectDialog(true)}
            disabled={isProcessing}
            className="rounded-lg border border-destructive/30 bg-card px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>

      {showRejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground">
              Reject PTO Request
            </h3>
            <p className="mt-1 text-sm text-primary">
              Please provide a reason for rejecting this request
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={4}
              placeholder="Enter rejection reason..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason("");
                }}
                disabled={isProcessing}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 transition-colors"
              >
                Reject Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
