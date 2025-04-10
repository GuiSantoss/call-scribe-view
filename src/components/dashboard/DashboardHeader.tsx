
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Phone } from 'lucide-react';

interface DashboardHeaderProps {
  onNewCall?: () => void;
  onFilterChange?: (filter: string) => void;
}

const DashboardHeader = ({ onNewCall, onFilterChange }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">IT Support Calls</h1>
        <p className="text-muted-foreground">Manage and track support requests</p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Select onValueChange={onFilterChange} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onNewCall} className="w-full sm:w-auto">
          <Phone className="h-4 w-4 mr-2" />
          New Call
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
