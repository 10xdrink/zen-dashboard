import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Phone, Mail, CheckCircle, Calendar, Edit, X } from "lucide-react";

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

interface DailyViewProps {
  appointments: Appointment[];
  currentDate: Date;
}

// Helper function to format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed': return 'bg-blue-500';
    case 'checked-in': return 'bg-green-500';
    case 'in-progress': return 'bg-amber-500';
    case 'completed': return 'bg-gray-500';
    case 'no-show': return 'bg-red-500';
    case 'cancelled': return 'bg-red-300';
    default: return 'bg-gray-300';
  }
};

const DailyView: React.FC<DailyViewProps> = ({ appointments, currentDate }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Time slots from 8 AM to 6 PM
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8;
    return new Date(currentDate).setHours(hour, 0, 0, 0);
  });

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDetailOpen(true);
  };

  // Check if an appointment falls within a time slot
  const getAppointmentsForTimeSlot = (slotTime: number) => {
    const slotStart = new Date(slotTime);
    const slotEnd = new Date(slotTime);
    slotEnd.setHours(slotEnd.getHours() + 1);

    return appointments.filter(
      (appt) => appt.start >= slotStart && appt.start < slotEnd
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Timeline Calendar (Left) */}
      <div className="md:col-span-2">
        <Card className="h-[600px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[550px]">
              {timeSlots.map((slotTime) => {
                const slotAppointments = getAppointmentsForTimeSlot(slotTime);
                const slotTimeString = formatTime(new Date(slotTime));
                
                return (
                  <div key={slotTime} className="flex border-t border-gray-200">
                    <div className="w-16 py-2 px-2 text-xs font-medium text-gray-500 flex-shrink-0">
                      {slotTimeString}
                    </div>
                    <div className="flex-1 min-h-[60px] py-1 relative border-l border-gray-200">
                      {slotAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className={`mx-2 mb-1 p-2 rounded cursor-pointer ${getStatusColor(appointment.status)} text-white text-sm`}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{appointment.patient.name}</span>
                            <span className="text-xs">{formatTime(appointment.start)}-{formatTime(appointment.end)}</span>
                          </div>
                          <div className="text-xs">{appointment.service} • {appointment.doctor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Detail Panel (Right) */}
      <div>
        <Card className="h-[600px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Selected Appointment</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-gray-500 h-full">
            Click an appointment to view details
          </CardContent>
        </Card>
      </div>

      {/* Detail Drawer */}
      <Drawer open={detailOpen} onOpenChange={setDetailOpen}>
        <DrawerContent className="w-full md:max-w-lg ml-auto md:rounded-l-lg">
          <DrawerHeader>
            <DrawerTitle>Appointment Details</DrawerTitle>
          </DrawerHeader>
          {selectedAppointment && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <div className="bg-primary h-full w-full flex items-center justify-center text-lg text-white">
                    {selectedAppointment.patient.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedAppointment.patient.name}</h3>
                  <p className="text-sm text-gray-500">ID: {selectedAppointment.patient.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="block text-gray-500">Service</span>
                  <span>{selectedAppointment.service}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Doctor</span>
                  <span>{selectedAppointment.doctor}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Time</span>
                  <span>{formatTime(selectedAppointment.start)} - {formatTime(selectedAppointment.end)}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Status</span>
                  <Badge className={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <p className="text-sm">{selectedAppointment.notes || "No notes"}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Check-in
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Reschedule
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" /> Edit Notes
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2 text-red-500">
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
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

export default DailyView;
