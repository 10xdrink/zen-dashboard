import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { MoreVertical, CalendarIcon, Clock, Plus } from "lucide-react";

interface Appointment {
  id: number;
  patient: string;
  service: string;
  doctor: string;
  datetime: string; // ISO
  status: string;
}

const mockAppointments: Appointment[] = [
  { id: 1, patient: "John Doe", service: "Physio", doctor: "Dr. Smith", datetime: "2025-06-20T09:30", status: "Confirmed" },
  { id: 2, patient: "Jane Smith", service: "Dental", doctor: "Dr. Adams", datetime: "2025-06-20T11:00", status: "Confirmed" },
];

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  /* ---------- handlers ---------- */
  const openReschedule = (appt: Appointment) => { setSelected(appt); setRescheduleOpen(true); };
  const openCancel = (appt: Appointment) => { setSelected(appt); setCancelOpen(true); };
  const openModify = (appt: Appointment) => { setSelected(appt); setModifyOpen(true); };

  /* ---------- UI ---------- */
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Appointments Manage" pageSubtitle="Reschedule, cancel or modify" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Today</h2>
            <Button size="sm" variant="outline" onClick={() => setBulkOpen(true)}>Bulk Actions</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{new Date(a.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{a.patient}</TableCell>
                  <TableCell>{a.service}</TableCell>
                  <TableCell>{a.doctor}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openReschedule(a)}>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModify(a)}>Modify Services</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openCancel(a)}>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Reschedule Drawer */}
      <Drawer open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DrawerContent className="w-full md:max-w-lg ml-auto md:rounded-l-lg">
          <DrawerHeader>
            <DrawerTitle>Reschedule Appointment</DrawerTitle>
            {selected && (
              <p className="text-sm text-gray-500">{selected.patient} • {selected.service} • {new Date(selected.datetime).toLocaleString()}</p>
            )}
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {/* Mini calendar placeholder */}
            <div className="border rounded h-64 flex items-center justify-center text-gray-400">
              Calendar + time slots (TBD)
            </div>
            <Input placeholder="Reason for change" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Notify via</p>
              {['SMS','Email','In-App'].map(ch => (
                <label key={ch} className="flex items-center space-x-2 text-sm">
                  <Checkbox id={ch} /> <span>{ch}</span>
                </label>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success('Appointment moved (mock)'); setRescheduleOpen(false); }}>Save & Notify</Button>
            <DrawerClose asChild><Button size="sm" variant="outline">Cancel</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Cancel Modal */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Cancel Appointment</DialogTitle></DialogHeader>
          {selected && <p className="text-sm text-gray-500 mb-4">{selected.patient} • {selected.service} • {new Date(selected.datetime).toLocaleString()}</p>}
          <div className="space-y-4">
            <Input placeholder="Cancellation reason" />
            <div>
              <p className="text-sm font-medium mb-1">Refund</p>
              {['Full','Partial','No'].map(r => (
                <label key={r} className="flex items-center space-x-2 text-sm">
                  <input type="radio" name="refund" /> <span>{r}</span>
                </label>
              ))}
            </div>
            <label className="flex items-center space-x-2 text-sm">
              <Checkbox /> <span>Offer slot to waitlist</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => { toast.error('Appointment cancelled (mock)'); setCancelOpen(false); }}>Confirm Cancellation</Button>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>Back</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modify Services Drawer */}
      <Drawer open={modifyOpen} onOpenChange={setModifyOpen}>
        <DrawerContent className="w-full md:max-w-lg ml-auto md:rounded-l-lg">
          <DrawerHeader>
            <DrawerTitle>Modify Appointment Services</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="border rounded h-40 flex items-center justify-center text-gray-400">Service checklist (TBD)</div>
            <div className="border rounded h-24 flex items-center justify-center text-gray-400">Price change summary (TBD)</div>
            <div className="border rounded h-24 flex items-center justify-center text-gray-400">Duration adjustment (TBD)</div>
          </div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success('Services updated (mock)'); setModifyOpen(false); }}>Save Changes</Button>
            <DrawerClose asChild><Button size="sm" variant="outline">Back</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Bulk Operations Panel */}
      <Drawer open={bulkOpen} onOpenChange={setBulkOpen}>
        <DrawerContent className="w-full md:max-w-2xl ml-auto md:rounded-l-lg">
          <DrawerHeader><DrawerTitle>Bulk Appointment Operations</DrawerTitle></DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="border rounded h-64 flex items-center justify-center text-gray-400">Bulk operations UI (TBD)</div>
          </div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success('Bulk operation executed (mock)'); setBulkOpen(false); }}>Apply</Button>
            <DrawerClose asChild><Button size="sm" variant="outline">Close</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ManageAppointments;
