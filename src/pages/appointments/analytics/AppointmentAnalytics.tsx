import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, ClipboardList, LineChart } from "lucide-react";
import BookingPatterns from "@/pages/appointments/analytics/BookingPatterns";
import NoShowAnalysis from "@/pages/appointments/analytics/NoShowAnalysis";
import CapacityOptimization from "@/pages/appointments/analytics/CapacityOptimization";

// Mock data for doctors
const doctors = [
  { id: "dr1", name: "Dr. Adams" },
  { id: "dr2", name: "Dr. Wilson" },
  { id: "dr3", name: "Dr. Lee" },
  { id: "dr4", name: "Dr. Garcia" },
  { id: "dr5", name: "Dr. Patel" },
];

const AppointmentAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("booking-patterns");
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
    to: new Date(),
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Appointment Analytics" pageSubtitle="Insights and metrics for appointment data" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4">
          {/* Top controls */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl font-bold">Appointment Analytics</h1>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Doctors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DateRangePicker
                from={dateRange.from}
                to={dateRange.to}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
              />
            </div>
          </div>

          {/* Main tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sticky top-0">
            <div className=" top-0 bg-white z-50 border-b shadow-sm">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="booking-patterns" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" /> Booking Patterns
                </TabsTrigger>
                <TabsTrigger value="no-show-analysis" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" /> No-Show Analysis
                </TabsTrigger>
                <TabsTrigger value="capacity-optimization" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" /> Capacity Optimization
                </TabsTrigger>
              </TabsList>
            </div>
          
            <div className="mb-4 pt-2">
              <TabsContent value="booking-patterns" className="mt-0">
                <BookingPatterns 
                  doctor={selectedDoctor} 
                  dateRange={dateRange} 
                />
              </TabsContent>

              <TabsContent value="no-show-analysis" className="mt-0">
                <NoShowAnalysis 
                  doctor={selectedDoctor} 
                  dateRange={dateRange} 
                />
              </TabsContent>

              <TabsContent value="capacity-optimization" className="mt-0">
                <CapacityOptimization 
                  doctor={selectedDoctor} 
                  dateRange={dateRange} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAnalytics;
