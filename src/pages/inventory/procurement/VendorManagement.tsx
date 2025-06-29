import React, { useState, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, Edit, TrendingUp } from "lucide-react";

export interface Vendor {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  category: string;
  bank?: string;
  gst?: string;
  pan?: string;
  rating: number; // 1-5
  deliveries: number; // total deliveries
  onTime: number; // % on time
}

const initVendors: Vendor[] = [
  {
    id: "v1",
    company: "HealWell Pharma",
    contact: "Ravi Patel",
    phone: "+91-9876543210",
    email: "sales@healwell.com",
    category: "Medicine Suppliers",
    bank: "ICICI ****1234",
    gst: "29ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    rating: 4.5,
    deliveries: 120,
    onTime: 96,
  },
];

const categories = [
  "Medicine Suppliers",
  "Equipment Vendors",
  "Service Providers",
  "Emergency Suppliers",
];

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(initVendors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [filterCat, setFilterCat] = useState<string | undefined>();
  const [search, setSearch] = useState("");

  const openAdd = () => {
    setEditId(null);
    setForm({});
    setDialogOpen(true);
  };
  const openEdit = (v: Vendor) => {
    setEditId(v.id);
    setForm(v);
    setDialogOpen(true);
  };
  const save = () => {
    if (!form.company) return;
    if (editId) {
      setVendors((vs) => vs.map((v) => (v.id === editId ? { ...v, ...form } : v)));
    } else {
      setVendors((vs) => [...vs, { id: Date.now().toString(), rating: 0, deliveries: 0, onTime: 0, ...form }]);
    }
    setDialogOpen(false);
  };

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      if (filterCat && v.category !== filterCat) return false;
      if (search && !v.company.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [vendors, filterCat, search]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Vendor Management" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-end">
              <Input placeholder="Search vendor…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" />
              <Select value={filterCat} onValueChange={setFilterCat}>
                <SelectTrigger className="w-56"><SelectValue placeholder="Filter by Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filterCat && <Button variant="outline" onClick={() => setFilterCat(undefined)}>Clear</Button>}
            </div>
            <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Vendor</Button>
          </div>

          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead className="text-center w-20">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.company}</TableCell>
                    <TableCell>{v.contact}</TableCell>
                    <TableCell>{v.email}</TableCell>
                    <TableCell>{v.category}</TableCell>
                    <TableCell className="text-right">{v.rating.toFixed(1)}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip><TooltipTrigger asChild>
                          <Button size="icon" variant="outline" onClick={() => openEdit(v)}><Edit className="h-4 w-4" /></Button>
                        </TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No vendors found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* simple performance summary */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Vendor Performance Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vendors.map((v) => (
                <div key={v.id} className="border rounded p-2 space-y-1 text-sm">
                  <div className="font-medium">{v.company}</div>
                  <div>On-time: {v.onTime}%</div>
                  <div>Deliveries: {v.deliveries}</div>
                  <div>Rating: {v.rating.toFixed(1)}/5</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-screen overflow-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit Vendor" : "Add Vendor"}</DialogTitle></DialogHeader>
          <Tabs defaultValue="profile" className="mt-4">
            <TabsList className="flex gap-2 mb-4 border-b pb-2">
              <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
              <TabsTrigger value="bank" className="text-sm">Banking</TabsTrigger>
              <TabsTrigger value="tax" className="text-sm">Tax</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-3">
              <Input placeholder="Company Name" value={form.company||''} onChange={(e)=>setForm({...form,company:e.target.value})}/>
              <Input placeholder="Contact Person" value={form.contact||''} onChange={(e)=>setForm({...form,contact:e.target.value})}/>
              <Input placeholder="Phone" value={form.phone||''} onChange={(e)=>setForm({...form,phone:e.target.value})}/>
              <Input placeholder="Email" type="email" value={form.email||''} onChange={(e)=>setForm({...form,email:e.target.value})}/>
              <Select value={form.category} onValueChange={(v)=>setForm({...form,category:v})}>
                <SelectTrigger><SelectValue placeholder="Category"/></SelectTrigger>
                <SelectContent>{categories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="bank" className="space-y-3">
              <Input placeholder="Bank Details" value={form.bank||''} onChange={(e)=>setForm({...form,bank:e.target.value})}/>
            </TabsContent>
            <TabsContent value="tax" className="space-y-3">
              <Input placeholder="GST" value={form.gst||''} onChange={(e)=>setForm({...form,gst:e.target.value})}/>
              <Input placeholder="PAN" value={form.pan||''} onChange={(e)=>setForm({...form,pan:e.target.value})}/>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={()=>setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editId?"Save":"Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorManagement;
