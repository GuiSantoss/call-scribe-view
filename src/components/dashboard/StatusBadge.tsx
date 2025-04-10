
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "new" | "in-progress" | "resolved" | "urgent";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    new: "bg-status-new text-white",
    "in-progress": "bg-status-in-progress text-white",
    resolved: "bg-status-resolved text-white",
    urgent: "bg-status-urgent text-white",
  };

  const statusLabel = {
    new: "New",
    "in-progress": "In Progress",
    resolved: "Resolved",
    urgent: "Urgent",
  };

  return (
    <Badge 
      className={cn(
        "font-medium",
        statusStyles[status],
        className
      )}
    >
      {statusLabel[status]}
    </Badge>
  );
};

export default StatusBadge;
