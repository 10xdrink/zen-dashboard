import React, { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, TrendingUp, Package, CalendarClock, Plus, Settings2, Eye } from "lucide-react";

interface StockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  lastUpdated: string; // ISO date
  expiry?: string; // ISO date
  vendor: string;
  fastMoving: boolean;
}

const dummyStock: StockItem[] = [
  {
    id: "s1",
    name: "Paracetamol 500mg Tablet",
    code: "MED-001",
    category: "Medicines",
    quantity: 1200,
    costPrice: 0.5,
    sellingPrice: 1,
    lastUpdated: "2025-06-13",
    expiry: "2026-01-01",
    vendor: "HealWell",
    fastMoving: true,
  },
  {
    id: "s2",
    name: "Digital Thermometer",
    code: "EQ-045",
    category: "Medical Equipment",
    quantity: 20,
    costPrice: 800,
    sellingPrice: 1038,
    lastUpdated: "2025-06-14",
    vendor: "ThermoTech",
    fastMoving: false,
  },
  {
    id: "s3",
    name: "Vitamin C Serum",
    code: "BE-778",
    category: "Beauty Products",
    quantity: 5,
    costPrice: 1500,
    sellingPrice: 2075,
    lastUpdated: "2025-06-10",
    expiry: "2025-08-01",
    vendor: "GlowSkin",
    fastMoving: true,
  },
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

const CurrentStock: React.FC = () => {
  const [filterCat, setFilterCat] = useState<string | undefined>();
  const [filterLevel, setFilterLevel] = useState<string | undefined>();
  const [filterVendor, setFilterVendor] = useState<string | undefined>();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return dummyStock.filter((s) => {
      if (filterCat && s.category !== filterCat) return false;
      if (filterVendor && s.vendor !== filterVendor) return false;
      if (filterLevel) {
        if (filterLevel === "low" && s.quantity >= 50) return false;
        if (filterLevel === "normal" && (s.quantity < 50 || s.quantity > 500)) return false;
        if (filterLevel === "high" && s.quantity <= 500) return false;
      }
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterCat, filterLevel, filterVendor, search]);

  const totalValue = useMemo(() =>
    dummyStock.reduce((sum, s) => sum + s.quantity * s.costPrice, 0),
    []
  );
  const lowStock = useMemo(() => dummyStock.filter((s) => s.quantity < 50).length, []);
  const expiryAlerts = useMemo(() => dummyStock.filter((s) => s.expiry && new Date(s.expiry) < new Date(Date.now()+1000*60*60*24*30)).length, []);
  const fastMoving = useMemo(() => dummyStock.filter((s) => s.fastMoving).length, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Current Stock" />
        <main className="flex-1 p-6 overflow-auto space-y-6">
          {/* dashboard cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                <Package className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">{formatCurrency(totalValue)}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </CardHeader>
              <CardContent className="text-2xl font-bold text-destructive">{lowStock}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Expiry Alerts (30d)</CardTitle>
                <CalendarClock className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent className="text-2xl font-bold text-orange-500">{expiryAlerts}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fast Moving Items</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent className="text-2xl font-bold text-green-600">{fastMoving}</CardContent>
            </Card>
          </div>

          {/* filters */}
          <div className="flex flex-wrap items-end gap-4">
            <Input placeholder="Search product…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" />
            <Select onValueChange={setFilterCat} value={filterCat}>
              <SelectTrigger className="w-56"><SelectValue placeholder="Filter by Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Medicines">Medicines</SelectItem>
                <SelectItem value="Beauty Products">Beauty Products</SelectItem>
                <SelectItem value="Medical Equipment">Medical Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterLevel} value={filterLevel}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Stock Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterVendor} value={filterVendor}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Vendor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="HealWell">HealWell</SelectItem>
                <SelectItem value="ThermoTech">ThermoTech</SelectItem>
                <SelectItem value="GlowSkin">GlowSkin</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {setFilterCat(undefined);setFilterLevel(undefined);setFilterVendor(undefined);setSearch("");}}>Reset</Button>
          </div>

          {/* listing */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-32 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className={s.quantity<50?"bg-destructive/5":undefined}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.code}</TableCell>
                    <TableCell className="text-right font-medium">{s.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(s.quantity * s.costPrice)}</TableCell>
                    <TableCell>{new Date(s.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8"><Settings2 className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Adjust</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Order</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          </TooltipTrigger><TooltipContent><p>Details</p></TooltipContent></Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length===0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No items found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CurrentStock;
