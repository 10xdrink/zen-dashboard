import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Send, MessageSquare, Filter } from "lucide-react";

interface NoShowAnalysisProps {
  doctor?: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

// Mock data for summary cards
const summaryData = {
  overallNoShowRate: 8.3,
  averageNoShowPerDay: 2.7,
  revenueLost: 4280,
  repeatOffenders: 15
};

// Mock data for no-show list
const noShowData = [
  { 
    id: "NS1001", 
    date: "Jun 15, 2025", 
    patient: { id: "P1001", name: "Robert Smith", phone: "555-1234" }, 
    service: "Annual Checkup", 
    doctor: "Dr. Wilson", 
    noShowCount: 2,
    revenueImpact: 150,
    sparkline: [0, 1, 0, 0, 1, 0]
  },
  { 
    id: "NS1002", 
    date: "Jun 14, 2025", 
    patient: { id: "P1002", name: "Maria Garcia", phone: "555-5678" }, 
    service: "Dental Cleaning", 
    doctor: "Dr. Adams", 
    noShowCount: 1,
    revenueImpact: 95,
    sparkline: [0, 0, 0, 1, 0, 0]
  },
  { 
    id: "NS1003", 
    date: "Jun 12, 2025", 
    patient: { id: "P1003", name: "James Johnson", phone: "555-9012" }, 
    service: "Physical Therapy", 
    doctor: "Dr. Lee", 
    noShowCount: 3,
    revenueImpact: 210,
    sparkline: [1, 0, 1, 0, 0, 1]
  },
  { 
    id: "NS1004", 
    date: "Jun 10, 2025", 
    patient: { id: "P1004", name: "Sarah Williams", phone: "555-3456" }, 
    service: "Eye Examination", 
    doctor: "Dr. Patel", 
    noShowCount: 1,
    revenueImpact: 175,
    sparkline: [0, 0, 1, 0, 0, 0]
  },
  { 
    id: "NS1005", 
    date: "Jun 9, 2025", 
    patient: { id: "P1005", name: "David Wilson", phone: "555-7890" }, 
    service: "Skin Consultation", 
    doctor: "Dr. Garcia", 
    noShowCount: 2,
    revenueImpact: 130,
    sparkline: [0, 1, 0, 0, 1, 0]
  }
];

// Mock data for weekly no-show distribution
const weeklyDistribution = {
  monday: 12,
  tuesday: 8,
  wednesday: 15,
  thursday: 10,
  friday: 18,
  saturday: 4,
  sunday: 0
};

// Mock prevention strategies
const preventionStrategies = [
  "Enable pre-payment or deposits for appointments",
  "Add SMS reminders 24 hours before appointment",
  "Implement a 3-strike policy for repeat no-shows",
  "Offer incentives for on-time arrivals",
  "Provide transportation options for elderly patients"
];

const NoShowAnalysis: React.FC<NoShowAnalysisProps> = ({ doctor, dateRange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctorFilter, setDoctorFilter] = useState<string | undefined>(doctor);
  const [serviceFilter, setServiceFilter] = useState("");
  
  // Calculate top 3 no-show days
  const topNoShowDays = Object.entries(weeklyDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1));
  
  // Calculate sparkline max value for scaling
  const sparklineMax = Math.max(...noShowData.flatMap(d => d.sparkline));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Overall No-Show Rate</span>
              <span className="text-3xl font-bold text-red-500">{summaryData.overallNoShowRate}%</span>
              <span className="text-xs text-gray-400 mt-1">of all appointments</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average No-Shows</span>
              <span className="text-3xl font-bold">{summaryData.averageNoShowPerDay}</span>
              <span className="text-xs text-gray-400 mt-1">appointments per day</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Revenue Lost</span>
              <span className="text-3xl font-bold text-amber-500">${summaryData.revenueLost}</span>
              <span className="text-xs text-gray-400 mt-1">in the selected period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Repeat Offenders</span>
              <span className="text-3xl font-bold">{summaryData.repeatOffenders}</span>
              <span className="text-xs text-gray-400 mt-1">patients with {`>`}1 no-show</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Detailed Table - Left */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>No-Show Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filter row */}
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
                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Doctors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      <SelectItem value="dr1">Dr. Adams</SelectItem>
                      <SelectItem value="dr2">Dr. Wilson</SelectItem>
                      <SelectItem value="dr3">Dr. Lee</SelectItem>
                      <SelectItem value="dr4">Dr. Garcia</SelectItem>
                      <SelectItem value="dr5">Dr. Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="checkup">Annual Checkup</SelectItem>
                      <SelectItem value="dental">Dental Cleaning</SelectItem>
                      <SelectItem value="therapy">Physical Therapy</SelectItem>
                      <SelectItem value="eye">Eye Examination</SelectItem>
                      <SelectItem value="skin">Skin Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>No-Shows</TableHead>
                      <TableHead>Revenue Impact</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {noShowData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.date}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.patient.name}</div>
                            <div className="text-xs text-gray-500">{item.patient.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.service}</TableCell>
                        <TableCell>{item.doctor}</TableCell>
                        <TableCell>
                          <Badge variant={item.noShowCount > 1 ? "destructive" : "outline"}>
                            {item.noShowCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">${item.revenueImpact}</span>
                            <div className="ml-2 flex h-2 items-end space-x-0.5">
                              {item.sparkline.map((value, i) => (
                                <div 
                                  key={i} 
                                  className="w-1 bg-red-500 rounded-t"
                                  style={{ height: `${(value / (sparklineMax || 1)) * 16}px` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="mr-2">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            Remind
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Sidebar - Pattern Analysis */}
        <div>
          {/* Weekly Distribution */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pattern Identification</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="text-sm font-medium mb-2">Top 3 No-Show Days</h4>
                <div className="grid grid-cols-3 gap-2">
                  {topNoShowDays.map((day, idx) => (
                    <div key={idx} className="text-center p-2 bg-red-50 rounded-md">
                      <div className="font-medium text-sm text-red-600">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Weekly Distribution</h4>
                <div className="h-32 flex items-end justify-between">
                  {Object.entries(weeklyDistribution).map(([day, count], idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-red-500 rounded-t"
                        style={{ 
                          height: `${(count / Math.max(...Object.values(weeklyDistribution))) * 100}px`,
                          opacity: topNoShowDays.includes(day.charAt(0).toUpperCase() + day.slice(1)) ? 1 : 0.5
                        }}
                      ></div>
                      <div className="text-xs mt-1">{day.slice(0, 3)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Prevention Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Prevention Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {preventionStrategies.map((strategy, idx) => (
                  <li key={idx} className="text-sm flex">
                    <span className="text-green-500 mr-2">•</span>
                    {strategy}
                  </li>
                ))}
              </ul>
              
              <Button className="w-full mt-4">
                <Send className="h-4 w-4 mr-2" />
                Implement Strategy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoShowAnalysis;
