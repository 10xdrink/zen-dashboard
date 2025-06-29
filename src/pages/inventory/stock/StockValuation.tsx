import React, { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StockLot {
  product: string;
  qty: number;
  cost: number;
}

// Very small mock lot-level data to demo valuation methods
const lots: StockLot[] = [
  { product: "Paracetamol 500mg Tablet", qty: 500, cost: 0.45 },
  { product: "Paracetamol 500mg Tablet", qty: 700, cost: 0.55 },
  { product: "Digital Thermometer", qty: 10, cost: 780 },
  { product: "Digital Thermometer", qty: 10, cost: 820 },
  { product: "Vitamin C Serum", qty: 5, cost: 1500 },
];

const format = (v: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

const StockValuation: React.FC = () => {
  const [method, setMethod] = useState("fifo");

  // group by product
  const grouped = useMemo(() => {
    const map: Record<string, StockLot[]> = {};
    lots.forEach((l) => {
      map[l.product] = map[l.product] ? [...map[l.product], l] : [l];
    });
    return map;
  }, []);

  const valued = useMemo(() => {
    const rows: { product: string; qty: number; unitCost: number; value: number }[] = [];
    Object.entries(grouped).forEach(([prod, lotArr]) => {
      let qty = lotArr.reduce((s, l) => s + l.qty, 0);
      let unitCost = 0;
      if (method === "average") {
        const totalCost = lotArr.reduce((s, l) => s + l.qty * l.cost, 0);
        unitCost = totalCost / qty;
      } else if (method === "fifo") {
        unitCost = lotArr[0].cost; // earliest cost
      } else if (method === "lifo") {
        unitCost = lotArr[lotArr.length - 1].cost; // latest cost
      }
      rows.push({ product: prod, qty, unitCost, value: unitCost * qty });
    });
    return rows;
  }, [grouped, method]);

  const totalValue = valued.reduce((s, r) => s + r.value, 0);

  // Basic turnover analysis: dummy numbers
  const cogs = totalValue * 2; // pretend cost of goods sold over year = 2x ending inventory
  const avgInventory = totalValue; // assume avg equals ending
  const turnover = cogs / avgInventory;
  const daysOnHand = 365 / turnover;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Stock Valuation" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          <Card>
            <CardHeader className="flex gap-4 items-center">
              <CardTitle>Select Valuation Method</CardTitle>
              <Select onValueChange={setMethod} value={method}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">FIFO</SelectItem>
                  <SelectItem value="lifo">LIFO</SelectItem>
                  <SelectItem value="average">Average Cost</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* summary */}
              <div className="text-xl font-bold">Current Stock Value: {format(totalValue)}</div>

              {/* valuation table */}
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit Cost</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {valued.map((r) => (
                      <TableRow key={r.product}>
                        <TableCell>{r.product}</TableCell>
                        <TableCell className="text-right">{r.qty}</TableCell>
                        <TableCell className="text-right">{format(r.unitCost)}</TableCell>
                        <TableCell className="text-right font-medium">{format(r.value)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* turnover analysis */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Inventory Turnover Analysis (FY)</h3>
                <p>COGS: {format(cogs)}</p>
                <p>Average Inventory: {format(avgInventory)}</p>
                <p>Turnover Ratio: {turnover.toFixed(2)} times/year</p>
                <p>Days on Hand: {daysOnHand.toFixed(0)} days</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StockValuation;
