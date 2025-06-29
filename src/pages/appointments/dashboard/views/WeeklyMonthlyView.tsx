import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  photo: string | null;
  phone: string;
  email: string;
}

interface Appointment {
  id: number;
  patient: Patient;
  service: string;
  doctor: string;
  start: Date;
  end: Date;
  status: string;
  notes: string;
  flags: string[];
}

interface WeeklyMonthlyViewProps {
  view: "weekly" | "monthly";
  appointments: Appointment[];
  currentDate: Date;
}

const WeeklyMonthlyView: React.FC<WeeklyMonthlyViewProps> = ({ view, appointments, currentDate }) => {
  // Get the start and end of the week or month
  const getDateRange = () => {
    const date = new Date(currentDate);
    if (view === "weekly") {
      // Set to start of week (Sunday)
      const day = date.getDay();
      const diff = date.getDate() - day;
      const startOfWeek = new Date(date);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);

      // End of week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return { start: startOfWeek, end: endOfWeek };
    } else {
      // Set to start of month
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      
      // End of month
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      return { start: startOfMonth, end: endOfMonth };
    }
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    return appointments.filter(
      (appt) => appt.start >= day && appt.start < nextDay
    );
  };

  // Generate days for view
  const generateDays = () => {
    const { start, end } = getDateRange();
    const days = [];
    const currentDay = new Date(start);

    while (currentDay <= end) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  // Format date to human-readable
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const days = generateDays();

  // Mock data for capacity planning
  const doctors = [
    { name: "Dr. Smith", booked: 75 },
    { name: "Dr. Adams", booked: 55 },
    { name: "Dr. Lee", booked: 90 },
  ];

  // Mock metrics
  const metrics = {
    waitTime: "12 min",
    noShowRate: "4.3%",
    dailyRevenue: "$2,450"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Calendar Grid */}
      <div className="md:col-span-2">
        <Card className="h-[600px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {view === "weekly" ? "Week Calendar" : "Month Calendar"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid ${view === "weekly" ? "grid-cols-7" : "grid-cols-7"} gap-2 h-[540px] overflow-y-auto`}>
              {days.map((day, index) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isCurrentDay = day.toDateString() === new Date().toDateString();

                return (
                  <div 
                    key={day.toString()} 
                    className={`border rounded p-2 ${isCurrentDay ? 'border-blue-500' : ''} ${view === "monthly" ? "h-24" : "h-full"} overflow-hidden`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{formatDate(day)}</span>
                      {dayAppointments.length > 0 && 
                        <Badge variant="secondary" className="text-xs">{dayAppointments.length}</Badge>
                      }
                    </div>
                    
                    {view === "weekly" ? (
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 5).map((appt) => (
                          <div key={appt.id} className="text-xs p-1 bg-blue-100 rounded truncate">
                            {appt.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {appt.patient.name}
                          </div>
                        ))}
                        {dayAppointments.length > 5 && (
                          <div className="text-xs text-center text-blue-500">+{dayAppointments.length - 5} more</div>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-[calc(100%-24px)]">
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4">
        {/* Capacity Planning */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Week Capacity</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Month Capacity</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Allocation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <div key={doc.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{doc.name}</span>
                    <span>{doc.booked}%</span>
                  </div>
                  <Progress value={doc.booked} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <Card className="bg-gray-50">
                <CardContent className="p-3">
                  <div className="text-xs text-gray-500">Wait Time</div>
                  <div className="text-sm font-medium">{metrics.waitTime}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-3">
                  <div className="text-xs text-gray-500">No-Shows</div>
                  <div className="text-sm font-medium">{metrics.noShowRate}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-3">
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="text-sm font-medium">{metrics.dailyRevenue}</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyMonthlyView;
