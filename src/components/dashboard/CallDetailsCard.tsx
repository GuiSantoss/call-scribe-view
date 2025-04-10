
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { CallData } from './CallList';
import { Clock, User, Building, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

interface CallDetailsCardProps {
  call: CallData;
  onClose: () => void;
  onStatusChange: (status: "new" | "in-progress" | "resolved" | "urgent") => void;
}

const CallDetailsCard = ({ call, onClose, onStatusChange }: CallDetailsCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Call Details</CardTitle>
          <StatusBadge status={call.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" /> Date
            </div>
            <p className="font-medium">{call.date}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" /> Duration
            </div>
            <p className="font-medium">{call.duration || "N/A"}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" /> Caller
          </div>
          <p className="font-medium">{call.caller.name}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="h-4 w-4 mr-1" /> Department
          </div>
          <p className="font-medium">{call.caller.department}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1" /> Issue
          </div>
          <p className="font-medium">{call.issue}</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Update Status</div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={call.status === "new" ? "default" : "outline"}
              onClick={() => onStatusChange("new")}
            >
              New
            </Button>
            <Button
              size="sm"
              variant={call.status === "in-progress" ? "default" : "outline"}
              onClick={() => onStatusChange("in-progress")}
            >
              In Progress
            </Button>
            <Button
              size="sm"
              variant={call.status === "urgent" ? "default" : "outline"}
              onClick={() => onStatusChange("urgent")}
            >
              Urgent
            </Button>
            <Button
              size="sm"
              variant={call.status === "resolved" ? "default" : "outline"}
              onClick={() => onStatusChange("resolved")}
            >
              Resolved
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        
        <div className="flex space-x-2">
          {call.status !== "resolved" ? (
            <Button onClick={() => onStatusChange("resolved")} className="bg-status-resolved hover:bg-status-resolved/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Resolved
            </Button>
          ) : (
            <Button onClick={() => onStatusChange("in-progress")} className="bg-status-in-progress hover:bg-status-in-progress/90">
              <XCircle className="h-4 w-4 mr-2" />
              Reopen Call
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CallDetailsCard;
