import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Send, ArrowUp, ArrowDown, CalendarCheck, Edit, MessageSquare, Search } from "lucide-react";

// Mock data for waitlist patients
const mockPatients = [
  { 
    id: "WL001", 
    name: "John Smith", 
    requestedDate: "Jun 21, 2025", 
    priority: "VIP",
    requestDate: "Jun 15, 2025",
    phone: "555-1234",
    preferredTimes: "Morning",
    flexibility: "Flexible"
  },
  { 
    id: "WL002", 
    name: "Sarah Johnson", 
    requestedDate: "Jun 22, 2025", 
    priority: "Urgent",
    requestDate: "Jun 16, 2025",
    phone: "555-5678",
    preferredTimes: "Afternoon",
    flexibility: "Rigid"
  },
  { 
    id: "WL003", 
    name: "Michael Brown", 
    requestedDate: "Jun 23, 2025", 
    priority: "Standard",
    requestDate: "Jun 16, 2025",
    phone: "555-9012",
    preferredTimes: "Morning, Afternoon",
    flexibility: "Flexible"
  },
  { 
    id: "WL004", 
    name: "Emily Davis", 
    requestedDate: "Jun 24, 2025", 
    priority: "Standard",
    requestDate: "Jun 17, 2025",
    phone: "555-3456",
    preferredTimes: "Afternoon",
    flexibility: "Weekend Only"
  },
  { 
    id: "WL005", 
    name: "James Wilson", 
    requestedDate: "Jun 25, 2025", 
    priority: "VIP",
    requestDate: "Jun 17, 2025",
    phone: "555-7890",
    preferredTimes: "Morning",
    flexibility: "Rigid"
  }
];

// Mock templates for communication
const communicationTemplates = [
  { id: "temp1", name: "Slot Available Confirmation", content: "Dear {patientName}, we have an available appointment slot on {date} at {time}. Please confirm if you would like to book this slot." },
  { id: "temp2", name: "Reminder", content: "Hello {patientName}, just a reminder that you're on our waitlist for an appointment. We'll notify you as soon as a slot becomes available." },
  { id: "temp3", name: "Follow-up", content: "Hello {patientName}, we wanted to follow up regarding your waitlist request. Would you like to remain on our waitlist?" }
];

const WaitlistAdministration: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Mock analytics data
  const analyticsData = {
    queueLength: 37,
    averageWaitTime: "4.2 days",
    vipCount: 8,
    nextAvailableETA: "Jun 21, 2025"
  };

  const handlePriorityChange = (patientId: string, direction: "up" | "down") => {
    // Handle priority change logic here
    console.log(`Changed priority ${direction} for patient ${patientId}`);
  };

  const handleAllocate = (patientId: string) => {
    // Handle allocation logic here
    console.log(`Allocated slot for patient ${patientId}`);
  };

  const handleSendMessage = (patientId: string) => {
    // Handle sending message logic
    console.log(`Sending message to patient ${patientId} using template ${selectedTemplate}`);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500">Current Queue Length</span>
              <span className="text-3xl font-bold text-primary">{analyticsData.queueLength}</span>
              <span className="text-xs text-gray-400">patients waiting</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500">Average Wait Time</span>
              <span className="text-3xl font-bold text-amber-500">{analyticsData.averageWaitTime}</span>
              <span className="text-xs text-gray-400">from registration to allocation</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500">VIP Patients</span>
              <span className="text-3xl font-bold text-amber-600">{analyticsData.vipCount}</span>
              <span className="text-xs text-gray-400">priority patients</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500">Next Available Slot</span>
              <span className="text-2xl font-bold text-green-500">{analyticsData.nextAvailableETA}</span>
              <span className="text-xs text-gray-400">estimated time of availability</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* VIP Column */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Badge className="bg-amber-500 mr-2">VIP</Badge>
                Priority Patients
              </h3>
              <div className="space-y-4">
                {mockPatients.filter(p => p.priority === "VIP").map(patient => (
                  <Card key={patient.id} className="shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-gray-500">Requested: {patient.requestedDate}</div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handlePriorityChange(patient.id, "down")}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Urgent Column */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Badge className="bg-red-500 mr-2">Urgent</Badge>
                Priority Patients
              </h3>
              <div className="space-y-4">
                {mockPatients.filter(p => p.priority === "Urgent").map(patient => (
                  <Card key={patient.id} className="shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-gray-500">Requested: {patient.requestedDate}</div>
                        </div>
                        <div className="flex">
                          <Button variant="ghost" size="sm" onClick={() => handlePriorityChange(patient.id, "up")}>
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handlePriorityChange(patient.id, "down")}>
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Standard Column */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Badge className="bg-gray-500 mr-2">Standard</Badge>
                Priority Patients
              </h3>
              <div className="space-y-4">
                {mockPatients.filter(p => p.priority === "Standard").map(patient => (
                  <Card key={patient.id} className="shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-gray-500">Requested: {patient.requestedDate}</div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handlePriorityChange(patient.id, "up")}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Allocation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by patient name or ID" 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="next-week">Next Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Flexibility</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-gray-500">{patient.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      patient.priority === "VIP" ? "bg-amber-500" :
                      patient.priority === "Urgent" ? "bg-red-500" : "bg-gray-500"
                    }>
                      {patient.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.requestDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                      {patient.requestedDate}
                      <span className="ml-1 text-xs text-gray-500">({patient.preferredTimes})</span>
                    </div>
                  </TableCell>
                  <TableCell>{patient.flexibility}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleAllocate(patient.id)}>
                      <CalendarCheck className="h-4 w-4 mr-1" />
                      Allocate
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleSendMessage(patient.id)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Communication Management */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select message template" />
                </SelectTrigger>
                <SelectContent>
                  {communicationTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send to Selected
            </Button>
          </div>

          {selectedTemplate && (
            <div className="mt-4 p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Preview:</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Template
                </Button>
              </div>
              <p className="text-sm">
                {communicationTemplates.find(t => t.id === selectedTemplate)?.content}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistAdministration;
