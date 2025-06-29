import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FilePlus2, CalendarCheck2, Banknote } from "lucide-react";

interface Invoice {
  id: string;
  vendor: string;
  poId: string;
  amount: number;
  tax: number;
  status: "pending" | "matched" | "approved";
  due: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  method: string;
  date: string;
  ref: string;
}

const PaymentsPage: React.FC = () => {
  const [tab, setTab] = useState("invoice");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  /* -------- Invoice Dialog ------- */
  const [invDialog, setInvDialog] = useState(false);
  const [invForm, setInvForm] = useState<any>({});
  const saveInv = () => {
    setInvoices((i) => [
      { id: Date.now().toString(), status: "pending", ...invForm },
      ...i,
    ]);
    setInvForm({});
    setInvDialog(false);
  };

  /* -------- Payment Dialog ------- */
  const [payDialog, setPayDialog] = useState(false);
  const [payForm, setPayForm] = useState<any>({});
  const savePay = () => {
    setPayments((p) => [
      { id: Date.now().toString(), date: new Date().toISOString(), ...payForm },
      ...p,
    ]);
    setPayForm({});
    setPayDialog(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Payments" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex gap-2 mb-4 border-b pb-2">
              <TabsTrigger value="invoice">Invoices</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="execute">Execution</TabsTrigger>
            </TabsList>

            {/* Invoices */}
            <TabsContent value="invoice" className="space-y-4">
              <Button onClick={() => setInvDialog(true)}><FilePlus2 className="h-4 w-4 mr-2"/>Record Invoice</Button>
              <Card>
                <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead>PO</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map(i=>(<TableRow key={i.id}><TableCell>{i.id}</TableCell><TableCell>{i.vendor}</TableCell><TableCell>{i.poId}</TableCell><TableCell>{i.amount}</TableCell><TableCell>{i.status}</TableCell></TableRow>))}
                      {invoices.length===0 && (<TableRow><TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No invoices.</TableCell></TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule */}
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Upcoming Payments</CardTitle></CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Invoice</TableHead><TableHead>Vendor</TableHead><TableHead>Due</TableHead><TableHead>Amount</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.filter(i=>i.status==='approved').map(i=>(<TableRow key={i.id}><TableCell>{i.id}</TableCell><TableCell>{i.vendor}</TableCell><TableCell>{i.due}</TableCell><TableCell>{i.amount}</TableCell></TableRow>))}
                      {invoices.filter(i=>i.status==='approved').length===0 && (<TableRow><TableCell colSpan={4} className="text-center py-4 text-muted-foreground">No scheduled payments.</TableCell></TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Execution */}
            <TabsContent value="execute" className="space-y-4">
              <Button onClick={()=>setPayDialog(true)}><Banknote className="h-4 w-4 mr-2"/>Process Payment</Button>
              <Card>
                <CardHeader><CardTitle>Payments</CardTitle></CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>ID</TableHead><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead>Method</TableHead><TableHead>Ref</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map(p=>(<TableRow key={p.id}><TableCell>{p.id}</TableCell><TableCell>{p.invoiceId}</TableCell><TableCell>{new Date(p.date).toLocaleDateString()}</TableCell><TableCell>{p.method}</TableCell><TableCell>{p.ref}</TableCell></TableRow>))}
                      {payments.length===0 && (<TableRow><TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No payments.</TableCell></TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Invoice Dialog */}
      <Dialog open={invDialog} onOpenChange={setInvDialog}>
        <DialogContent className="max-w-lg max-h-screen overflow-auto">
          <DialogHeader><DialogTitle>Record Invoice</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Vendor" value={invForm.vendor||''} onChange={e=>setInvForm({...invForm,vendor:e.target.value})}/>
            <Input placeholder="PO ID" value={invForm.poId||''} onChange={e=>setInvForm({...invForm,poId:e.target.value})}/>
            <Input placeholder="Amount" type="number" value={invForm.amount||''} onChange={e=>setInvForm({...invForm,amount:parseFloat(e.target.value)})}/>
            <Input placeholder="Tax" type="number" value={invForm.tax||''} onChange={e=>setInvForm({...invForm,tax:parseFloat(e.target.value)})}/>
            <Input placeholder="Due Date" type="date" value={invForm.due||''} onChange={e=>setInvForm({...invForm,due:e.target.value})}/>
            <Select value={invForm.status} onValueChange={v=>setInvForm({...invForm,status:v})}>
              <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent><SelectItem value="pending">Pending Match</SelectItem><SelectItem value="matched">Matched</SelectItem><SelectItem value="approved">Approved</SelectItem></SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={()=>setInvDialog(false)}>Cancel</Button>
            <Button onClick={saveInv}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={payDialog} onOpenChange={setPayDialog}>
        <DialogContent className="max-w-lg max-h-screen overflow-auto">
          <DialogHeader><DialogTitle>Process Payment</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Invoice ID" value={payForm.invoiceId||''} onChange={e=>setPayForm({...payForm,invoiceId:e.target.value})}/>
            <Select value={payForm.method} onValueChange={v=>setPayForm({...payForm,method:v})}>
              <SelectTrigger><SelectValue placeholder="Method"/></SelectTrigger>
              <SelectContent><SelectItem value="Bank Transfer">Bank Transfer</SelectItem><SelectItem value="Cheque">Cheque</SelectItem></SelectContent>
            </Select>
            <Input placeholder="Reference #" value={payForm.ref||''} onChange={e=>setPayForm({...payForm,ref:e.target.value})}/>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={()=>setPayDialog(false)}>Cancel</Button>
            <Button onClick={savePay}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsPage;
