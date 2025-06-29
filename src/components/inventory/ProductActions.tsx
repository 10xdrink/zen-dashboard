import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { Pencil, IndianRupee, Boxes, Clock, Archive } from "lucide-react";
import { Product } from "@/services/productService";

interface HistoryItem { timestamp: number; description: string; }
interface ProductActionsProps {
  product: Product;
  history: HistoryItem[];
  onEdit?: (data: Partial<Product>) => void; // optional when using editLink
  onPricing: (data: Partial<Product>) => void;
  onStock: (data: Partial<Product>) => void;
  onDeactivate: () => void;
  editLink?: string; // if provided, pencil navigates here
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, history, onEdit, onPricing, onStock, onDeactivate, editLink }) => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<null | "edit" | "pricing" | "stock" | "history" | "deactivate">(null);
  const [form, setForm] = useState<any>({});

  const openDialog = (type: typeof dialog) => {
    setForm({});
    setDialog(type);
  };
  const closeDialog = () => setDialog(null);
  const submit = () => {
    if (dialog === "edit") onEdit(form);
    if (dialog === "pricing") onPricing(form);
    if (dialog === "stock") onStock(form);
    closeDialog();
  };
  const confirmDeactivate = () => {
    onDeactivate();
    closeDialog();
  };

  const handleChange = (key: string, value: any) => setForm((p: any) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={() => {
                  if (onEdit) {
                    onEdit({});
                  } else if (editLink) {
                    navigate(editLink);
                  } else {
                    openDialog("edit");
                  }
                }}>
                <Pencil className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit details</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={() => openDialog("pricing")}>
                <IndianRupee className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Update pricing</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={() => openDialog("stock")}>
                <Boxes className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Manage stock</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={() => openDialog("history")}>
                <Clock className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View history</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="destructive" onClick={() => openDialog("deactivate")}>
                <Archive className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Deactivate product</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Dialogs */}
      <Dialog open={dialog === "edit"} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product Info</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="space-y-4">
              <Input
                defaultValue={product.name}
                placeholder="Product Name"
                onChange={e => handleChange("name", e.target.value)}
              />
              <Textarea
                defaultValue={product.description}
                placeholder="Description"
                className="h-24"
                onChange={e => handleChange("description", e.target.value)}
              />
            </CardContent>
          </Card>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            <Button onClick={submit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === "pricing"} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Pricing</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="grid grid-cols-2 gap-4">
              <Input
                defaultValue={String(product.costPrice)}
                placeholder="Cost Price"
                type="number"
                onChange={e => handleChange("costPrice", parseFloat(e.target.value))}
              />
              <Input
                defaultValue={String(product.sellingPrice)}
                placeholder="Selling Price"
                type="number"
                onChange={e => handleChange("sellingPrice", parseFloat(e.target.value))}
              />
              <Input
                defaultValue={String(product.discount)}
                placeholder="Discount (%)"
                type="number"
                onChange={e => handleChange("discount", parseFloat(e.target.value))}
              />
              <Input
                defaultValue={product.taxCategory}
                placeholder="Tax Category"
                onChange={e => handleChange("taxCategory", e.target.value)}
              />
            </CardContent>
          </Card>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            <Button onClick={submit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === "stock"} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Stock</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="grid grid-cols-3 gap-4">
              <Input
                defaultValue={String(product.minStock)}
                placeholder="Min Stock"
                type="number"
                onChange={e => handleChange("minStock", parseInt(e.target.value))}
              />
              <Input
                defaultValue={String(product.maxStock)}
                placeholder="Max Stock"
                type="number"
                onChange={e => handleChange("maxStock", parseInt(e.target.value))}
              />
              <Input
                defaultValue={String(product.reorderPoint)}
                placeholder="Reorder Point"
                type="number"
                onChange={e => handleChange("reorderPoint", parseInt(e.target.value))}
              />
            </CardContent>
          </Card>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            <Button onClick={submit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === "history"} onOpenChange={closeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Product History</DialogTitle>
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {history.length ? history.map((h, i) => (
              <Card key={i} className="p-3">
                <CardContent className="space-y-1">
                  <div className="text-xs text-gray-500">
                    {new Date(h.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm">{h.description}</div>
                </CardContent>
              </Card>
            )) : (
              <p className="text-center text-sm text-gray-500">No history available.</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === "deactivate"} onOpenChange={closeDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deactivation</DialogTitle>
          </DialogHeader>
          <p className="mb-4">Are you sure you want to deactivate this product? It will no longer be visible to customers.</p>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeactivate}>Deactivate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductActions;
