import React, { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { AlertCircle, AlertTriangle, CalendarClock, RotateCcw, Trash2, BookOpen } from "lucide-react";

interface ExpItem {
  id: string;
  name: string;
  category: string;
  batch?: string;
  expiry: string; // ISO
  quantity: number;
  vendor: string;
}

// Re-use some dummy items
const dummyExp: ExpItem[] = [
  {
    id: "e1",
    name: "Vitamin C Serum",
    category: "Beauty Products",
    batch: "A23",
    expiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15d
    quantity: 5,
    vendor: "GlowSkin",
  },
  {
    id: "e2",
    name: "Paracetamol 500mg Tablet",
    category: "Medicines",
    batch: "P500",
    expiry: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(), // 55d
    quantity: 200,
    vendor: "HealWell",
  },
  {
    id: "e3",
    name: "Old Glucose Strips",
    category: "Clinic Supplies",
    batch: "GLU99",
    expiry: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // expired 5d ago
    quantity: 30,
    vendor: "MediLab",
  },
];

const daysBetween = (d: Date, base = new Date()) =>
  Math.ceil((d.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));

const ExpiryManagement: React.FC = () => {
  const [search, setSearch] = useState("");

  const classified = useMemo(() => {
    return dummyExp.map((i) => {
      const diff = daysBetween(new Date(i.expiry));
      let status: "expired" | "30" | "60" | "90" | "ok" = "ok";
      if (diff < 0) status = "expired";
      else if (diff <= 30) status = "30";
      else if (diff <= 60) status = "60";
      else if (diff <= 90) status = "90";
      return { ...i, status };
    });
  }, []);

  const filtered = useMemo(() => {
    return classified.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [classified, search]);

  const expired = classified.filter((i) => i.status === "expired").length;
  const exp30 = classified.filter((i) => i.status === "30").length;
  const exp60 = classified.filter((i) => i.status === "60").length;
  const exp90 = classified.filter((i) => i.status === "90").length;
  const actionRequired = expired + exp30;

  const [actionsLog, setActionsLog] = useState<any[]>([]);
  const logAction = (itemId: string, action: string) => {
    setActionsLog((l) => [
      { id: Date.now(), itemId, action, date: new Date().toISOString() },
      ...l,
    ]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Expiry Management" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          {/* dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-sm">Expiring ≤30d</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold text-orange-500">{exp30}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-sm">Expiring ≤60d</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold text-amber-500">{exp60}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-sm">Expiring ≤90d</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold text-yellow-500">{exp90}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-sm">Expired</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold text-destructive">{expired}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <CardTitle className="text-sm">Action Required</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold text-primary">{actionRequired}</CardContent>
            </Card>
          </div>

          {/* search */}
          <div className="flex gap-4 items-center">
            <Input placeholder="Search item…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-60" />
          </div>

          {/* table */}
          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((i) => (
                  <TableRow key={i.id} className={i.status === "expired" ? "bg-destructive/10" : undefined}>
                    <TableCell>{i.name}</TableCell>
                    <TableCell>{i.batch}</TableCell>
                    <TableCell>{new Date(i.expiry).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{i.quantity}</TableCell>
                    <TableCell>
                      {i.status === "expired" && <span className="text-destructive font-medium">Expired</span>}
                      {i.status === "30" && <span className="text-orange-500">≤30d</span>}
                      {i.status === "60" && <span className="text-amber-500">≤60d</span>}
                      {i.status === "90" && <span className="text-yellow-600">≤90d</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={()=>logAction(i.id,'return')}><RotateCcw className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Return</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="destructive" className="h-8 w-8" onClick={()=>logAction(i.id,'dispose')}><Trash2 className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Dispose</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={()=>logAction(i.id,'train')}><BookOpen className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Use in Training</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No items found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* action log simple */}
          {actionsLog.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Action Log</CardTitle></CardHeader>
              <CardContent className="max-h-64 overflow-auto">
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Item</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {actionsLog.map((l) => {
                      const item = dummyExp.find((d) => d.id === l.itemId);
                      return (
                        <TableRow key={l.id}><TableCell>{new Date(l.date).toLocaleString()}</TableCell><TableCell>{item?.name}</TableCell><TableCell>{l.action}</TableCell></TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExpiryManagement;
