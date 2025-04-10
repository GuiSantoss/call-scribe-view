
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import StatsCard from './StatsCard';
import CallList, { CallData } from './CallList';
import DashboardHeader from './DashboardHeader';
import { Phone, PhoneOff, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CallDetailsCard from './CallDetailsCard';

// Sample data for our dashboard
const SAMPLE_CALLS: CallData[] = [
  {
    id: '1',
    caller: { name: 'John Doe', department: 'Marketing' },
    issue: 'Cannot access email account after password reset',
    status: 'new',
    date: '2025-04-10',
    duration: '5:21',
  },
  {
    id: '2',
    caller: { name: 'Jane Smith', department: 'Finance' },
    issue: 'Printer not connecting to the network',
    status: 'in-progress',
    date: '2025-04-09',
    duration: '12:08',
  },
  {
    id: '3',
    caller: { name: 'Robert Johnson', department: 'HR' },
    issue: 'VPN connection issues when working remotely',
    status: 'resolved',
    date: '2025-04-08',
    duration: '8:15',
  },
  {
    id: '4',
    caller: { name: 'Sarah Williams', department: 'Executive' },
    issue: 'Laptop not turning on after Windows update',
    status: 'urgent',
    date: '2025-04-10',
    duration: '3:45',
  },
  {
    id: '5',
    caller: { name: 'Michael Brown', department: 'Sales' },
    issue: 'Unable to install required software for presentation',
    status: 'new',
    date: '2025-04-09',
    duration: '7:30',
  },
  {
    id: '6',
    caller: { name: 'Emily Davis', department: 'Customer Support' },
    issue: 'Headset not working with call center application',
    status: 'in-progress',
    date: '2025-04-08',
    duration: '9:10',
  },
  {
    id: '7',
    caller: { name: 'David Wilson', department: 'IT' },
    issue: 'Server monitoring alert - high CPU usage',
    status: 'resolved',
    date: '2025-04-07',
    duration: '15:22',
  },
];

const Dashboard = () => {
  const [calls, setCalls] = useState<CallData[]>(SAMPLE_CALLS);
  const [filteredCalls, setFilteredCalls] = useState<CallData[]>(SAMPLE_CALLS);
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const { toast } = useToast();
  
  const newCalls = calls.filter(call => call.status === 'new').length;
  const inProgressCalls = calls.filter(call => call.status === 'in-progress').length;
  const resolvedCalls = calls.filter(call => call.status === 'resolved').length;
  const urgentCalls = calls.filter(call => call.status === 'urgent').length;

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setFilteredCalls(calls);
    } else {
      setFilteredCalls(calls.filter(call => call.status === filter));
    }
  };

  const handleViewCall = (id: string) => {
    const call = calls.find(c => c.id === id);
    if (call) {
      setSelectedCall(call);
      setDetailsOpen(true);
    }
  };

  const handleNewCall = () => {
    toast({
      title: "Create New Call",
      description: "The new call form would open here in a real application.",
    });
  };

  const handleStatusChange = (status: "new" | "in-progress" | "resolved" | "urgent") => {
    if (selectedCall) {
      const updatedCalls = calls.map(call => 
        call.id === selectedCall.id ? { ...call, status } : call
      );
      setCalls(updatedCalls);
      setFilteredCalls(updatedCalls.filter(call => {
        const currentFilter = document.querySelector("[data-radix-select-value]")?.textContent?.toLowerCase();
        return currentFilter === 'all status' || call.status === currentFilter;
      }));
      setSelectedCall({ ...selectedCall, status });
      
      toast({
        title: "Call Status Updated",
        description: `Call status changed to ${status.replace('-', ' ')}`,
      });
    }
  };

  // Response time metrics data for chart
  const metricsData = [
    { name: 'Urgent', value: 15, fill: '#8b5cf6' },
    { name: 'High', value: 30, fill: '#6366f1' },
    { name: 'Medium', value: 60, fill: '#3b82f6' },
    { name: 'Low', value: 120, fill: '#2563eb' },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader onNewCall={handleNewCall} onFilterChange={handleFilterChange} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="New Calls" 
          value={newCalls} 
          description="Calls waiting to be processed"
          icon={<Phone className="h-4 w-4" />}
        />
        <StatsCard 
          title="In Progress" 
          value={inProgressCalls}
          description="Calls currently being handled" 
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard 
          title="Resolved" 
          value={resolvedCalls}
          description="Successfully closed tickets" 
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatsCard 
          title="Urgent" 
          value={urgentCalls}
          description="High priority issues" 
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Recent Calls</h2>
        <CallList calls={filteredCalls} onViewCall={handleViewCall} />
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedCall && (
            <CallDetailsCard 
              call={selectedCall} 
              onClose={() => setDetailsOpen(false)} 
              onStatusChange={handleStatusChange}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
