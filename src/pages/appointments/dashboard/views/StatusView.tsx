import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

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

interface StatusViewProps {
  appointments: Appointment[];
}

// Format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const StatusView: React.FC<StatusViewProps> = ({ appointments }) => {
  // All possible statuses
  const statuses = ["Confirmed", "Pending", "In-Progress", "Completed", "No-Show", "Cancelled"];

  // Filter appointments by status
  const getAppointmentsByStatus = (status: string) => {
    return appointments.filter(
      (appt) => appt.status.toLowerCase() === status.toLowerCase()
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-blue-500';
      case 'pending': return 'bg-amber-300';
      case 'in-progress': return 'bg-amber-500';
      case 'completed': return 'bg-gray-500';
      case 'no-show': return 'bg-red-500';
      case 'cancelled': return 'bg-red-300';
      default: return 'bg-gray-300';
    }
  };

  // Flag icons
  const getFlagIcon = (flag: string) => {
    switch (flag.toLowerCase()) {
      case 'vip': return <span className="text-yellow-500 text-xs">★</span>;
      case 'translator': return <span className="text-blue-500 text-xs">🌐</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input placeholder="Search appointments..." className="pl-8" />
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statuses.map((status) => {
          const statusAppointments = getAppointmentsByStatus(status);
          
          return (
            <Card key={status} className="h-[480px]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{status}</CardTitle>
                  <Badge variant="secondary">{statusAppointments.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <ScrollArea className="h-[420px]">
                  {statusAppointments.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No appointments
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {statusAppointments.map((appointment) => (
                        <Card key={appointment.id} className="p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-7 w-7">
                                <div className="h-full w-full flex items-center justify-center text-xs">
                                  {appointment.patient.name.charAt(0)}
                                </div>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{appointment.patient.name}</div>
                                <div className="text-xs text-gray-500">{appointment.patient.id}</div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {appointment.flags.map((flag) => (
                                <div key={flag}>{getFlagIcon(flag)}</div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="text-xs flex justify-between">
                              <span>{formatTime(appointment.start)}</span>
                              <span>{appointment.service}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {appointment.doctor}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatusView;
