import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Filter, Check, Clock, Bell, Calendar, CirclePlus } from "lucide-react";
// Import view components
import DailyView from "@/pages/appointments/dashboard/views/DailyView";
import WeeklyMonthlyView from "@/pages/appointments/dashboard/views/WeeklyMonthlyView";
import StatusView from "@/pages/appointments/dashboard/views/StatusView";
import LiveUpdatesView from "@/pages/appointments/dashboard/views/LiveUpdatesView";

// Dummy data for appointments
export const mockAppointments = [
  { 
    id: 1, 
    patient: { id: "P1001", name: "John Doe", photo: null, phone: "555-1234", email: "john@example.com" }, 
    service: "Physical Therapy", 
    doctor: "Dr. Smith", 
    start: new Date(2025, 5, 17, 9, 0), // June 17, 2025, 9:00
    end: new Date(2025, 5, 17, 10, 0),
    status: "Confirmed",
    notes: "First visit",
    flags: []
  },
  { 
    id: 2, 
    patient: { id: "P1002", name: "Jane Smith", photo: null, phone: "555-5678", email: "jane@example.com" }, 
    service: "Dental Cleaning", 
    doctor: "Dr. Adams", 
    start: new Date(2025, 5, 17, 10, 30), // June 17, 2025, 10:30
    end: new Date(2025, 5, 17, 11, 30),
    status: "Checked-In",
    notes: "Follow-up appointment",
    flags: ["VIP"]
  },
  { 
    id: 3, 
    patient: { id: "P1003", name: "Bob Johnson", photo: null, phone: "555-9012", email: "bob@example.com" }, 
    service: "Annual Checkup", 
    doctor: "Dr. Lee", 
    start: new Date(2025, 5, 17, 13, 0), // June 17, 2025, 13:00
    end: new Date(2025, 5, 17, 14, 0),
    status: "Confirmed",
    notes: "",
    flags: ["Translator"]
  },
  { 
    id: 4, 
    patient: { id: "P1004", name: "Alice Brown", photo: null, phone: "555-3456", email: "alice@example.com" }, 
    service: "Consultation", 
    doctor: "Dr. Smith", 
    start: new Date(2025, 5, 17, 14, 30), // June 17, 2025, 14:30
    end: new Date(2025, 5, 17, 15, 0),
    status: "In-Progress",
    notes: "New patient",
    flags: []
  },
  { 
    id: 5, 
    patient: { id: "P1005", name: "Tom Wilson", photo: null, phone: "555-7890", email: "tom@example.com" }, 
    service: "X-Ray", 
    doctor: "Dr. Lee", 
    start: new Date(2025, 5, 17, 15, 30), // June 17, 2025, 15:30
    end: new Date(2025, 5, 17, 16, 0),
    status: "Completed",
    notes: "",
    flags: []
  },
  { 
    id: 6, 
    patient: { id: "P1006", name: "Sarah Miller", photo: null, phone: "555-2345", email: "sarah@example.com" }, 
    service: "Consultation", 
    doctor: "Dr. Adams", 
    start: new Date(2025, 5, 17, 16, 30), // June 17, 2025, 16:30
    end: new Date(2025, 5, 17, 17, 0),
    status: "No-Show",
    notes: "",
    flags: []
  }
];

const AppointmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Appointment Dashboard" pageSubtitle="Manage your schedule" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4">
          {/* Top controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span>{currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500" variant="secondary">
                <Check className="h-3 w-3 mr-1" /> 25 appointments today
              </Badge>
            </div>
          </div>

          {/* Main tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Monthly
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Status
              </TabsTrigger>
              <TabsTrigger value="live" className="relative flex items-center gap-2">
                <Bell className="h-4 w-4" /> Live
                <span className="absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 animate-pulse"></span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <DailyView appointments={mockAppointments} currentDate={currentDate} />
            </TabsContent>
            
            <TabsContent value="weekly">
              <WeeklyMonthlyView view="weekly" appointments={mockAppointments} currentDate={currentDate} />
            </TabsContent>
            
            <TabsContent value="monthly">
              <WeeklyMonthlyView view="monthly" appointments={mockAppointments} currentDate={currentDate} />
            </TabsContent>
            
            <TabsContent value="status">
              <StatusView appointments={mockAppointments} />
            </TabsContent>
            
            <TabsContent value="live">
              <LiveUpdatesView />
            </TabsContent>
          </Tabs>

          {/* Bottom bar */}
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <div className="flex items-center space-x-2">
              <Button size="sm" className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" /> Add Appointment
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded mr-1"></div>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded mr-1"></div>
                <span>Checked-In</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-amber-500 rounded mr-1"></div>
                <span>In-Progress</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-gray-500 rounded mr-1"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-red-500 rounded mr-1"></div>
                <span>No-Show</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;
