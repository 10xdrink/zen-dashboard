import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Calendar, ClipboardList, UserCog } from "lucide-react";
import WaitlistRegistration from "./WaitlistRegistration";
import AutomaticAllocation from "./AutomaticAllocation";
import WaitlistAdministration from "./WaitlistAdministration";

const WaitlistManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 30)),
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Waitlist Management" pageSubtitle="Manage patient waiting list" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4">
          {/* Top controls */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Waitlist Management</h1>
            <div className="flex items-center space-x-2">
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
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="registration" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Registration
              </TabsTrigger>
              <TabsTrigger value="allocation" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" /> Auto Allocation
              </TabsTrigger>
              <TabsTrigger value="administration" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" /> Administration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="registration">
              <WaitlistRegistration />
            </TabsContent>

            <TabsContent value="allocation">
              <AutomaticAllocation />
            </TabsContent>

            <TabsContent value="administration">
              <WaitlistAdministration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WaitlistManagement;
