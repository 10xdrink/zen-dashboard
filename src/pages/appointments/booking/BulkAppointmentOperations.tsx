import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";

const BulkAppointmentOperations: React.FC = () => {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Bulk Appointment Operations" pageSubtitle="Batch booking, rescheduling, blocking slots" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-6">
          <Tabs defaultValue="batch" className="w-full">
            <TabsList>
              <TabsTrigger value="batch">Batch Booking</TabsTrigger>
              <TabsTrigger value="reschedule">Mass Rescheduling</TabsTrigger>
              <TabsTrigger value="block">Block Time Slots</TabsTrigger>
              <TabsTrigger value="holiday">Holiday Updates</TabsTrigger>
            </TabsList>
            <TabsContent value="batch" className="space-y-4">
              <Input type="file" accept=".csv" />
              <Button size="sm" onClick={() => toast.success('CSV processed (mock)')}>Upload</Button>
            </TabsContent>
            <TabsContent value="reschedule" className="space-y-4">
              <p className="text-sm">Push all selected appointments by:</p>
              <Input placeholder="e.g. 1 week" className="max-w-xs" />
              <Button size="sm" onClick={() => toast.success('Rescheduled (mock)')}>Apply</Button>
            </TabsContent>
            <TabsContent value="block" className="space-y-4">
              <Calendar mode="range" />
              <Button size="sm" onClick={() => toast.success('Slots blocked (mock)')}>Block Selected</Button>
            </TabsContent>
            <TabsContent value="holiday" className="space-y-4">
              <Calendar mode="single" />
              <Checkbox id="clinic" /> <label htmlFor="clinic" className="text-sm ml-2">Mark all clinics closed</label>
              <Button size="sm" onClick={() => toast.success('Holiday added (mock)')}>Save</Button>
            </TabsContent>
          </Tabs>
          <div>
            <Button onClick={() => setApplyOpen(true)}>Review & Execute</Button>
          </div>
        </div>
      </div>

      <Drawer open={applyOpen} onOpenChange={setApplyOpen}>
        <DrawerContent className="w-full md:max-w-lg ml-auto md:rounded-l-lg">
          <DrawerHeader><DrawerTitle>Confirm Bulk Operation</DrawerTitle></DrawerHeader>
          <div className="p-4">Preview summary of affected items (TBD)</div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success('Bulk operation executed (mock)'); setApplyOpen(false); }}>Apply to X items</Button>
            <DrawerClose asChild><Button size="sm" variant="outline">Cancel</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BulkAppointmentOperations;
