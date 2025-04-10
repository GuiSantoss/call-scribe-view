
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import StatusBadge from './StatusBadge';
import { Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CallData {
  id: string;
  caller: {
    name: string;
    department: string;
  };
  issue: string;
  status: "new" | "in-progress" | "resolved" | "urgent";
  date: string;
  duration?: string;
}

interface CallListProps {
  calls: CallData[];
  onViewCall?: (id: string) => void;
}

const CallList = ({ calls, onViewCall }: CallListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Caller</TableHead>
            <TableHead className="hidden md:table-cell">Issue</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Duration</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id}>
              <TableCell className="font-medium">{call.date}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{call.caller.name}</div>
                  <div className="text-xs text-muted-foreground">{call.caller.department}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{call.issue}</TableCell>
              <TableCell>
                <StatusBadge status={call.status} />
              </TableCell>
              <TableCell>{call.duration || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewCall?.(call.id)}
                  title="View Call Details"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallList;
