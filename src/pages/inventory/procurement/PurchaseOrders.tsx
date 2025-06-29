import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Truck, FileCheck2 } from "lucide-react";

interface Requisition {
  id: string;
  department: string;
  item: string;
  qty: number;
  budget: number;
  urgency: string;
  status: "pending" | "approved";
}

interface PurchaseOrder {
  id: string;
  vendor: string;
  items: { name: string; qty: number; price: number }[];
  delivery: string;
  payment: string;
  status: "draft" | "issued" | "delivered" | "closed";
}

const PurchaseOrders: React.FC = () => {
  const [tab, setTab] = useState("req");
  const [reqs, setReqs] = useState<Requisition[]>([]);
  const [poList, setPoList] = useState<PurchaseOrder[]>([]);

  // requisition form
  const [reqForm, setReqForm] = useState<any>({});
  const addReq = () => {
    setReqs((r) => [...r, { id: Date.now().toString(), status: "pending", ...reqForm }]);
    setReqForm({});
  };

  // PO dialog
  const [poDialog, setPoDialog] = useState(false);
  const [poForm, setPoForm] = useState<any>({ items: [] });
  const addItemToPO = () => {
    setPoForm({ ...poForm, items: [...poForm.items, { name: "", qty: 1, price: 0 }] });
  };
  const savePO = () => {
    setPoList((p) => [...p, { id: Date.now().toString(), status: "draft", ...poForm }]);
    setPoDialog(false);
    setPoForm({ items: [] });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Purchase Orders" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex gap-2 mb-4 border-b pb-2">
              <TabsTrigger value="req">Requisitions</TabsTrigger>
              <TabsTrigger value="po">Purchase Orders</TabsTrigger>
            </TabsList>

            {/* Requisition Tab */}
            <TabsContent value="req" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Create Requisition</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Department" value={reqForm.department||''} onChange={e=>setReqForm({...reqForm,department:e.target.value})} />
                  <Input placeholder="Item Description" value={reqForm.item||''} onChange={e=>setReqForm({...reqForm,item:e.target.value})} />
                  <Input placeholder="Quantity" type="number" value={reqForm.qty||''} onChange={e=>setReqForm({...reqForm,qty:parseInt(e.target.value)})} />
                  <Input placeholder="Budget (INR)" type="number" value={reqForm.budget||''} onChange={e=>setReqForm({...reqForm,budget:parseFloat(e.target.value)})} />
                  <Select value={reqForm.urgency} onValueChange={v=>setReqForm({...reqForm,urgency:v})}>
                    <SelectTrigger><SelectValue placeholder="Urgency"/></SelectTrigger>
                    <SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
                  </Select>
                  <Button onClick={addReq} className="sm:col-span-2">Submit</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Requisition List</CardTitle></CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>ID</TableHead><TableHead>Dept</TableHead><TableHead>Item</TableHead><TableHead>Qty</TableHead><TableHead>Urgency</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {reqs.map(r=>(<TableRow key={r.id}><TableCell>{r.id}</TableCell><TableCell>{r.department}</TableCell><TableCell>{r.item}</TableCell><TableCell>{r.qty}</TableCell><TableCell>{r.urgency}</TableCell><TableCell>{r.status}</TableCell></TableRow>))}
                      {reqs.length===0 && (<TableRow><TableCell colSpan={6} className="text-center py-4 text-muted-foreground">No requisitions.</TableCell></TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PO tab */}
            <TabsContent value="po" className="space-y-6">
              <Button onClick={()=>setPoDialog(true)}><Plus className="h-4 w-4 mr-2"/>Create PO</Button>
              <Card>
                <CardHeader><CardTitle>Purchase Orders</CardTitle></CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead>Status</TableHead><TableHead>Items</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {poList.map(p=>(<TableRow key={p.id}><TableCell>{p.id}</TableCell><TableCell>{p.vendor}</TableCell><TableCell>{p.status}</TableCell><TableCell>{p.items.length}</TableCell></TableRow>))}
                      {poList.length===0 && (<TableRow><TableCell colSpan={4} className="text-center py-4 text-muted-foreground">No POs.</TableCell></TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* PO Dialog */}
      <Dialog open={poDialog} onOpenChange={setPoDialog}>
        <DialogContent className="max-w-3xl max-h-screen overflow-auto">
          <DialogHeader><DialogTitle>Create Purchase Order</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Vendor" value={poForm.vendor||''} onChange={e=>setPoForm({...poForm,vendor:e.target.value})} />
            <div className="space-y-2 border rounded p-3">
              <div className="flex justify-between"><div className="font-medium">Items</div><Button size="sm" variant="outline" onClick={addItemToPO}><Plus className="h-4 w-4"/>Add Item</Button></div>
              {poForm.items.map((it:any,idx:number)=>(
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <Input placeholder="Name" value={it.name} onChange={e=>{
                    const arr=[...poForm.items]; arr[idx].name=e.target.value; setPoForm({...poForm,items:arr});}}
                  />
                  <Input placeholder="Qty" type="number" value={it.qty} onChange={e=>{const arr=[...poForm.items]; arr[idx].qty=parseInt(e.target.value); setPoForm({...poForm,items:arr});}} />
                  <Input placeholder="Price" type="number" value={it.price} onChange={e=>{const arr=[...poForm.items]; arr[idx].price=parseFloat(e.target.value); setPoForm({...poForm,items:arr});}} />
                </div>
              ))}
            </div>
            <Input placeholder="Delivery Terms" value={poForm.delivery||''} onChange={e=>setPoForm({...poForm,delivery:e.target.value})} />
            <Input placeholder="Payment Terms" value={poForm.payment||''} onChange={e=>setPoForm({...poForm,payment:e.target.value})} />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={()=>setPoDialog(false)}>Cancel</Button>
            <Button onClick={savePO}>Save PO</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
