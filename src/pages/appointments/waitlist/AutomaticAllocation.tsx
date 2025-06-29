import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Eye, MessageSquare, Search, Users } from "lucide-react";

// Mock data for waitlist patients
const mockWaitlistPatients = [
  {
    id: "W1001",
    patient: { id: "P1001", name: "Jane Doe", phone: "555-1234", email: "jane@example.com" },
    requestedSlots: [
      { day: "Jun 21, 2025", periods: ["Morning"] },
      { day: "Jun 22, 2025", periods: ["Afternoon"] },
    ],
    priority: "Standard",
    status: "Waiting",
    requestDate: "Jun 15, 2025",
    flexibility: "Flexible",
  },
  {
    id: "W1002",
    patient: { id: "P1002", name: "Tom Smith", phone: "555-5678", email: "tom@example.com" },
    requestedSlots: [
      { day: "Jun 23, 2025", periods: ["Morning", "Afternoon"] },
    ],
    priority: "Urgent",
    status: "Allocated",
    requestDate: "Jun 16, 2025",
    flexibility: "Rigid",
  },
  {
    id: "W1003",
    patient: { id: "P1003", name: "Alice Johnson", phone: "555-9012", email: "alice@example.com" },
    requestedSlots: [
      { day: "Jun 24, 2025", periods: ["Afternoon"] },
      { day: "Jun 25, 2025", periods: ["Morning"] },
    ],
    priority: "VIP",
    status: "Waiting",
    requestDate: "Jun 16, 2025",
    flexibility: "Weekend Only",
  },
  {
    id: "W1004",
    patient: { id: "P1004", name: "Mike Brown", phone: "555-3456", email: "mike@example.com" },
    requestedSlots: [
      { day: "Jun 26, 2025", periods: ["Morning"] },
    ],
    priority: "Standard",
    status: "Waiting",
    requestDate: "Jun 17, 2025",
    flexibility: "Flexible",
  },
  {
    id: "W1005",
    patient: { id: "P1005", name: "Sarah Wilson", phone: "555-7890", email: "sarah@example.com" },
    requestedSlots: [
      { day: "Jun 27, 2025", periods: ["Afternoon"] },
    ],
    priority: "Standard",
    status: "Waiting",
    requestDate: "Jun 17, 2025",
    flexibility: "Rigid",
  },
];

// Mock data for recent allocations
const mockRecentAllocations = [
  {
    id: "A1001",
    patient: "Tom Smith",
    slot: "June 23, 2025, 10:00 AM",
    allocatedAt: "3 hours ago",
  },
  {
    id: "A1002",
    patient: "Lisa Adams",
    slot: "June 22, 2025, 2:30 PM",
    allocatedAt: "Yesterday",
  },
  {
    id: "A1003",
    patient: "Robert Chen",
    slot: "June 24, 2025, 9:15 AM",
    allocatedAt: "2 days ago",
  },
];

const AutomaticAllocation: React.FC = () => {
  const [autoFill, setAutoFill] = useState(true);
  const [dayFlexibility, setDayFlexibility] = useState([2]);
  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Left Pane - Settings */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Auto-Fill Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="auto-fill" checked={autoFill} onCheckedChange={setAutoFill} />
            <Label htmlFor="auto-fill">Enable Auto-Fill</Label>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="day-flexibility">Match within ±{dayFlexibility[0]} days</Label>
              <span className="text-sm text-gray-500">{dayFlexibility[0]}</span>
            </div>
            <Slider
              id="day-flexibility" 
              disabled={!autoFill}
              value={dayFlexibility} 
              min={0}
              max={7}
              step={1}
              onValueChange={setDayFlexibility}
            />
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-medium">Notification Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="sms-notification" checked={smsNotification} onCheckedChange={setSmsNotification} />
                <Label htmlFor="sms-notification">Send SMS notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-notification" checked={emailNotification} onCheckedChange={setEmailNotification} />
                <Label htmlFor="email-notification">Send email notifications</Label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full" disabled={!autoFill}>
              Apply Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Center Pane - Live Queue Table */}
      <Card className="md:col-span-5">
        <CardHeader>
          <CardTitle>Live Waitlist Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search by patient name or ID..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWaitlistPatients.map((entry) => (
                <TableRow key={entry.id} className={entry.status === "Allocated" ? "bg-green-50" : ""}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{entry.patient.name}</div>
                      <div className="text-xs text-gray-500">ID: {entry.patient.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      entry.priority === "VIP" ? "bg-amber-500" :
                      entry.priority === "Urgent" ? "bg-red-500" : "bg-gray-500"
                    }>
                      {entry.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      entry.status === "Allocated" ? "text-green-500 border-green-200" : 
                      "text-gray-500 border-gray-200"
                    }>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{entry.requestDate}</div>
                    <div className="text-xs text-gray-500">{entry.flexibility}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Right Pane - Recent Allocations Feed */}
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Recent Allocations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {mockRecentAllocations.map((allocation) => (
                <Card key={allocation.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{allocation.patient}</span>
                      <span className="text-xs text-gray-500">{allocation.allocatedAt}</span>
                    </div>
                    <div className="text-sm mt-1">
                      Allocated: {allocation.slot}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="outline" onClick={() => setPreviewOpen(true)} className="w-full">
              View Confirmation Preview
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Confirmation Preview Drawer */}
      <Drawer open={previewOpen} onOpenChange={setPreviewOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Confirmation Preview</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 py-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Appointment Confirmed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Dear Tom Smith,</p>
                  <p className="text-sm">
                    We're pleased to inform you that your appointment has been scheduled from our waitlist.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-medium">Appointment Details:</h4>
                  <p className="text-sm">Date: June 23, 2025</p>
                  <p className="text-sm">Time: 10:00 AM</p>
                  <p className="text-sm">Doctor: Dr. Adams</p>
                  <p className="text-sm">Service: Annual Checkup</p>
                </div>
                
                <div className="text-sm">
                  <p>Please arrive 15 minutes before your appointment time. If you need to reschedule, please contact us at least 24 hours in advance.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AutomaticAllocation;
