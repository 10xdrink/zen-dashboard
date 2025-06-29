import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "react-hot-toast";
import { Plus, Edit, Filter, Eye } from "lucide-react";

/**
 * Patient Communication module (UI-only skeleton)
 * Implements three tabs (Automated, Manual, History) as per spec.
 * NOTE: This is a front-end placeholder – integrate with back-end APIs later.
 */

const automatedTemplates = [
  {
    id: "appointment_confirmation",
    title: "Appointment Confirmations",
    enabled: true,
  },
  { id: "reminder", title: "Reminder Messages", enabled: true },
  { id: "follow_up", title: "Follow-up Care Instructions", enabled: false },
  { id: "greetings", title: "Birthday / Anniversary Wishes", enabled: true },
];

const quickSnippets = [
  "Health Tip – Stay Hydrated 💧",
  "Promo Offer – 10% off physiotherapy",
  "Follow-up: How are you feeling today?",
];

const dummyHistory = [
  {
    id: 1,
    when: "2025-06-15 10:34",
    patient: "John Doe",
    channel: "SMS",
    type: "Reminder",
    dir: "Out",
    status: "Sent",
  },
  {
    id: 2,
    when: "2025-06-14 09:20",
    patient: "Jane Smith",
    channel: "Email",
    type: "Appointment",
    dir: "Out",
    status: "Failed",
  },
];

const PatientCommunication: React.FC = () => {
  const [templates, setTemplates] = useState(automatedTemplates);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof automatedTemplates[0] | null>(null);
  const [manualMessage, setManualMessage] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const openEditor = (tpl: typeof automatedTemplates[0]) => {
    setSelectedTemplate(tpl);
    setDrawerOpen(true);
  };

  const handleSnippetClick = (text: string) => {
    setManualMessage((prev) => prev + (prev ? "\n" : "") + text);
    setSelectedSnippet(text);
  };

  const sendManualMessage = () => {
    toast.success("Message queued for sending");
    setManualMessage("");
    setSelectedSnippet(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar
          pageTitle="Patient Communication"
          pageSubtitle="Central place to engage with patients"
        />


        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-24"> {/* offset for header */}
          <Tabs defaultValue="automated">
            <TabsList className="mb-4">
              <TabsTrigger value="automated">Automated</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Automated Tab */}
            <TabsContent value="automated">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="flex items-center space-x-2" onClick={() => toast("Add automation")}> <Plus className="w-4 h-4" /> <span>Add New Automation</span> </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {templates.map((tpl) => (
                  <Card key={tpl.id} className="shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{tpl.title}</h3>
                        <Switch checked={tpl.enabled} onCheckedChange={() => toggleTemplate(tpl.id)} />
                      </div>
                      <Button size="sm" variant="outline" className="w-full flex items-center justify-center space-x-1" onClick={() => openEditor(tpl)}>
                        <Edit className="w-4 h-4" /> <span>Edit Template</span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Manual Tab */}
            <TabsContent value="manual">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Compose panel */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm mb-1 font-medium">Message</label>
                    <Textarea value={manualMessage} onChange={(e) => setManualMessage(e.target.value)} className="min-h-[180px]" placeholder="Write your message..." />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={sendManualMessage}>Send</Button>
                    <Button size="sm" variant="outline" onClick={() => toast("Scheduling coming soon")}>Schedule</Button>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="space-y-4">
                  <h4 className="font-medium">Quick Snippets</h4>
                  <div className="flex flex-col space-y-2">
                    {quickSnippets.map((snip) => (
                      <Button key={snip} variant={selectedSnippet === snip ? "default" : "outline"} size="sm" className="justify-start" onClick={() => handleSnippetClick(snip)}>
                        {snip}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Input placeholder="Search..." className="max-w-[200px]" />
                <Button size="sm" variant="outline">Date Range</Button>
                <Button size="sm" variant="outline" className="flex items-center space-x-1"><Filter className="w-4 h-4" /><span>Channel</span></Button>
                <Button size="sm" variant="outline" className="flex items-center space-x-1"><Filter className="w-4 h-4" /><span>Status</span></Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyHistory.map((msg) => (
                    <TableRow key={msg.id} className="hover:bg-gray-50">
                      <TableCell>{msg.when}</TableCell>
                      <TableCell>{msg.patient}</TableCell>
                      <TableCell>{msg.channel}</TableCell>
                      <TableCell>{msg.type}</TableCell>
                      <TableCell>{msg.dir}</TableCell>
                      <TableCell>{msg.status}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => toast(JSON.stringify(msg, null, 2))}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Template editor drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="w-full md:max-w-xl ml-auto md:rounded-l-lg">
          <DrawerHeader>
            <DrawerTitle>Edit Template – {selectedTemplate?.title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <Input placeholder="Template Name" defaultValue={selectedTemplate?.title} />
            <select className="w-full border rounded h-10 px-2 bg-white">
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
            <Input placeholder="Subject (email only)" />
            <Textarea placeholder="Message body with {merge_fields}" className="min-h-[160px]" />
          </div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success("Template saved"); setDrawerOpen(false); }}>Save</Button>
            <DrawerClose asChild>
              <Button size="sm" variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PatientCommunication;
