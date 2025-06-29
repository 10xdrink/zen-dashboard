import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CheckCircle2, XCircle, PackageSearch } from "lucide-react";

interface ReceiptEntry {
  id: string;
  poId: string;
  product: string;
  deliveredQty: number;
  acceptedQty: number;
  batch?: string;
  expiry?: string;
  result: "accepted" | "rejected" | "partial";
  date: string;
}

const GoodsReceipt: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<any>({});
  const [receipts, setReceipts] = useState<ReceiptEntry[]>([]);

  const save = () => {
    const id = Date.now().toString();
    setReceipts((r) => [
      {
        id,
        date: new Date().toISOString(),
        ...form,
        result:
          form.acceptedQty === 0
            ? "rejected"
            : form.acceptedQty === form.deliveredQty
            ? "accepted"
            : "partial",
      },
      ...r,
    ]);
    setForm({});
    setDialog(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Goods Receipt" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <Button onClick={() => setDialog(true)} className="mb-2">New Goods Receipt</Button>

          <Card>
            <CardHeader><CardTitle>Receipt Records</CardTitle></CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead><TableHead>PO</TableHead><TableHead>Product</TableHead><TableHead>Delivered</TableHead><TableHead>Accepted</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receipts.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{new Date(r.date).toLocaleString()}</TableCell>
                      <TableCell>{r.poId}</TableCell>
                      <TableCell>{r.product}</TableCell>
                      <TableCell>{r.deliveredQty}</TableCell>
                      <TableCell>{r.acceptedQty}</TableCell>
                      <TableCell>
                        {r.result === "accepted" && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/>Accepted</span>}
                        {r.result === "rejected" && <span className="text-destructive flex items-center gap-1"><XCircle className="h-4 w-4"/>Rejected</span>}
                        {r.result === "partial" && <span className="text-orange-500 flex items-center gap-1"><PackageSearch className="h-4 w-4"/>Partial</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                  {receipts.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No receipts recorded.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dialog */}
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="max-w-xl max-h-screen overflow-auto">
          <DialogHeader><DialogTitle>Goods Receipt Entry</DialogTitle></DialogHeader>
          <Tabs defaultValue="inspect">
            <TabsList className="flex gap-2 mb-4 border-b pb-2 text-sm">
              <TabsTrigger value="inspect">Inspection</TabsTrigger>
              <TabsTrigger value="accept">Acceptance</TabsTrigger>
              <TabsTrigger value="update">Stock Update</TabsTrigger>
            </TabsList>
            {/* Inspection */}
            <TabsContent value="inspect" className="space-y-3">
              <Input placeholder="PO ID" value={form.poId||''} onChange={e=>setForm({...form,poId:e.target.value})}/>
              <Input placeholder="Product" value={form.product||''} onChange={e=>setForm({...form,product:e.target.value})}/>
              <Input placeholder="Delivered Quantity" type="number" value={form.deliveredQty||''} onChange={e=>setForm({...form,deliveredQty:parseInt(e.target.value)})}/>
              <Input placeholder="Damage Notes / QC Notes" value={form.qc||''} onChange={e=>setForm({...form,qc:e.target.value})}/>
            </TabsContent>
            {/* Acceptance */}
            <TabsContent value="accept" className="space-y-3">
              <Input placeholder="Accepted Quantity" type="number" value={form.acceptedQty||''} onChange={e=>setForm({...form,acceptedQty:parseInt(e.target.value)})}/>
              <Input placeholder="Rejection Reason (if any)" value={form.rejectReason||''} onChange={e=>setForm({...form,rejectReason:e.target.value})}/>
            </TabsContent>
            {/* Update */}
            <TabsContent value="update" className="space-y-3">
              <Input placeholder="Batch / Lot" value={form.batch||''} onChange={e=>setForm({...form,batch:e.target.value})}/>
              <Input placeholder="Expiry Date" type="date" value={form.expiry||''} onChange={e=>setForm({...form,expiry:e.target.value})}/>
              <Input placeholder="Location / Bin" value={form.location||''} onChange={e=>setForm({...form,location:e.target.value})}/>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={()=>setDialog(false)}>Cancel</Button>
            <Button onClick={save}>Save Receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoodsReceipt;
