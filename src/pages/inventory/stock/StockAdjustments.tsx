import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StockInEntry {
  id: string;
  product: string;
  qty: number;
  batch?: string;
  expiry?: string;
  supplier?: string;
  invoice?: string;
  qcStatus?: string;
  date: string;
}
interface StockOutEntry {
  id: string; product: string; reason: string; qty: number; patient?: string; staff?: string; date: string; }
interface TransferEntry { id: string; product: string; from: string; to: string; qty: number; doc?: string; date: string; }
interface CorrectionEntry { id: string; product: string; systemQty: number; actualQty: number; variance: number; reason?: string; approved: boolean; date: string; }

const StockAdjustments: React.FC = () => {
  const [tab, setTab] = useState("in");
  const [stockIns, setStockIns] = useState<StockInEntry[]>([]);
  const [stockOuts, setStockOuts] = useState<StockOutEntry[]>([]);
  const [transfers, setTransfers] = useState<TransferEntry[]>([]);
  const [corrections, setCorrections] = useState<CorrectionEntry[]>([]);

  // generic form states
  const [form, setForm] = useState<any>({});
  const handleChange = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const resetForm = () => setForm({});

  const addEntry = () => {
    const id = Date.now().toString();
    const date = new Date().toISOString();
    if (tab === "in") setStockIns([...stockIns, { id, date, ...form }]);
    if (tab === "out") setStockOuts([...stockOuts, { id, date, ...form }]);
    if (tab === "transfer") setTransfers([...transfers, { id, date, ...form }]);
    if (tab === "correction") setCorrections([...corrections, { id, date, ...form, variance: (form.actualQty||0)-(form.systemQty||0) }]);
    resetForm();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Stock Adjustments" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adjustment Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="flex gap-2 mb-4 border-b pb-2">
                  <TabsTrigger value="in" className={tab==='in'?"text-primary underline":""}>Stock In</TabsTrigger>
                  <TabsTrigger value="out" className={tab==='out'?"text-primary underline":""}>Stock Out</TabsTrigger>
                  <TabsTrigger value="transfer" className={tab==='transfer'?"text-primary underline":""}>Transfer</TabsTrigger>
                  <TabsTrigger value="correction" className={tab==='correction'?"text-primary underline":""}>Correction</TabsTrigger>
                </TabsList>

                {/* Stock In */}
                <TabsContent value="in" className="space-y-4">
                  <Input placeholder="Product" value={form.product||""} onChange={e=>handleChange('product',e.target.value)} />
                  <Input placeholder="Quantity Received" type="number" value={form.qty||""} onChange={e=>handleChange('qty',parseInt(e.target.value))} />
                  <Input placeholder="Batch/Lot Number" value={form.batch||""} onChange={e=>handleChange('batch',e.target.value)} />
                  <Input placeholder="Expiry Date" type="date" value={form.expiry||""} onChange={e=>handleChange('expiry',e.target.value)} />
                  <Input placeholder="Supplier" value={form.supplier||""} onChange={e=>handleChange('supplier',e.target.value)} />
                  <Input placeholder="Invoice Reference" value={form.invoice||""} onChange={e=>handleChange('invoice',e.target.value)} />
                  <Select value={form.qcStatus} onValueChange={v=>handleChange('qcStatus',v)}>
                    <SelectTrigger><SelectValue placeholder="Quality Check Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addEntry}>Add Stock In</Button>
                </TabsContent>

                {/* Stock Out */}
                <TabsContent value="out" className="space-y-4">
                  <Input placeholder="Product" value={form.product||""} onChange={e=>handleChange('product',e.target.value)} />
                  <Input placeholder="Consumption Reason" value={form.reason||""} onChange={e=>handleChange('reason',e.target.value)} />
                  <Input placeholder="Quantity Used" type="number" value={form.qty||""} onChange={e=>handleChange('qty',parseInt(e.target.value))} />
                  <Input placeholder="Patient/Service Ref" value={form.patient||""} onChange={e=>handleChange('patient',e.target.value)} />
                  <Input placeholder="Staff Authorization" value={form.staff||""} onChange={e=>handleChange('staff',e.target.value)} />
                  <Button onClick={addEntry}>Add Stock Out</Button>
                </TabsContent>

                {/* Transfer */}
                <TabsContent value="transfer" className="space-y-4">
                  <Input placeholder="Product" value={form.product||""} onChange={e=>handleChange('product',e.target.value)} />
                  <Input placeholder="From Location" value={form.from||""} onChange={e=>handleChange('from',e.target.value)} />
                  <Input placeholder="To Location" value={form.to||""} onChange={e=>handleChange('to',e.target.value)} />
                  <Input placeholder="Quantity" type="number" value={form.qty||""} onChange={e=>handleChange('qty',parseInt(e.target.value))} />
                  <Textarea placeholder="Transfer Documentation" value={form.doc||""} onChange={e=>handleChange('doc',e.target.value)} />
                  <Button onClick={addEntry}>Add Transfer</Button>
                </TabsContent>

                {/* Correction */}
                <TabsContent value="correction" className="space-y-4">
                  <Input placeholder="Product" value={form.product||""} onChange={e=>handleChange('product',e.target.value)} />
                  <Input placeholder="System Qty" type="number" value={form.systemQty||""} onChange={e=>handleChange('systemQty',parseInt(e.target.value))} />
                  <Input placeholder="Actual Qty" type="number" value={form.actualQty||""} onChange={e=>handleChange('actualQty',parseInt(e.target.value))} />
                  <Textarea placeholder="Reason for Discrepancy" value={form.reason||""} onChange={e=>handleChange('reason',e.target.value)} />
                  <Select value={form.approved?"yes":"no"} onValueChange={v=>handleChange('approved',v==="yes")}>  
                    <SelectTrigger><SelectValue placeholder="Approved?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addEntry}>Add Correction</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* History tables */}
          <Card>
            <CardHeader><CardTitle>Adjustment History</CardTitle></CardHeader>
            <CardContent className="overflow-auto">
              {tab === "in" && (
                <HistoryTable headers={["Date","Product","Qty","Supplier","Invoice","QC"]} rows={stockIns.map(i=>[new Date(i.date).toLocaleString(),i.product,i.qty,i.supplier,i.invoice,i.qcStatus])} />
              )}
              {tab === "out" && (
                <HistoryTable headers={["Date","Product","Qty","Reason","Patient","Staff"]} rows={stockOuts.map(o=>[new Date(o.date).toLocaleString(),o.product,o.qty,o.reason,o.patient,o.staff])} />
              )}
              {tab === "transfer" && (
                <HistoryTable headers={["Date","Product","Qty","From","To"]} rows={transfers.map(t=>[new Date(t.date).toLocaleString(),t.product,t.qty,t.from,t.to])} />
              )}
              {tab === "correction" && (
                <HistoryTable headers={["Date","Product","System","Actual","Variance","Reason","Approved"]} rows={corrections.map(c=>[new Date(c.date).toLocaleString(),c.product,c.systemQty,c.actualQty,c.variance,c.reason,c.approved?"Yes":"No"])}/>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

const HistoryTable: React.FC<{headers:string[];rows:any[][]}> = ({headers,rows}) => (
  <Table>
    <TableHeader>
      <TableRow>{headers.map(h=><TableHead key={h}>{h}</TableHead>)}</TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((r,i)=>(<TableRow key={i}>{r.map((c,idx)=><TableCell key={idx}>{c}</TableCell>)}</TableRow>))}
      {rows.length===0 && (<TableRow><TableCell colSpan={headers.length} className="text-center py-4 text-muted-foreground">No records.</TableCell></TableRow>)}
    </TableBody>
  </Table>
);

export default StockAdjustments;
