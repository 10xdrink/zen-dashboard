import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import { Product } from "@/services/productService";
interface ProductWithHistory extends Product {
  history: { timestamp: number; description: string }[];
}
import { Button } from "@/components/ui/button";
import ProductActions from "@/components/inventory/ProductActions";

const ProductCatalog: React.FC = () => {
  const navigate = useNavigate();
  const dummyProducts: ProductWithHistory[] = [
    {
      id: "p1",
      name: "Paracetamol 500mg Tablet",
      category: "Medicines",
      brand: "HealWell",
      sellingPrice: 100,
      costPrice: 0.5,
      minStock: 100,
      maxStock: 1000,
      reorderPoint: 150,
      isActive: true,
      history: [],
    },
    {
      id: "p2",
      name: "Digital Thermometer",
      category: "Medical Equipment",
      brand: "ThermoTech",
      sellingPrice: 1038,
      costPrice: 8,
      minStock: 20,
      maxStock: 200,
      reorderPoint: 30,
      isActive: true,
      history: [],
    },
    {
      id: "p3",
      name: "Vitamin C Serum",
      category: "Beauty Products",
      brand: "GlowSkin",
      sellingPrice: 2075,
      costPrice: 15,
      minStock: 50,
      maxStock: 500,
      reorderPoint: 60,
      isActive: true,
      history: [],
    },
    {
      id: "p4",
      name: "Surgical Gloves (Box of 100)",
      category: "Clinic Supplies",
      brand: "SafeHands",
      sellingPrice: 789,
      costPrice: 5,
      minStock: 30,
      maxStock: 300,
      reorderPoint: 40,
      isActive: false,
      history: [],
    },
    {
      id: "p5",
      name: "Blood Pressure Monitor",
      category: "Medical Equipment",
      brand: "MediCheck",
      sellingPrice: 3735,
      costPrice: 30,
      minStock: 10,
      maxStock: 100,
      reorderPoint: 15,
      isActive: true,
      history: [],
    },
  ];

  const [products, setProducts] = useState<ProductWithHistory[]>(dummyProducts);
  const reload = () => setProducts([...products]);

  // helper callbacks passed to action component
  const addHistory = (id: string, description: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, history: [...(p.history || []), { timestamp: Date.now(), description }] } : p
      )
    );
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addHistory(id, "Product information updated");
  };

  const updatePricing = (id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addHistory(id, "Pricing updated");
  };

  const updateStock = (id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addHistory(id, "Stock levels updated");
  };

  const deactivateProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: false } : p)));
    addHistory(id, "Product deactivated");
  };

  const getHistory = (id: string) => products.find((p) => p.id === id)?.history || [];

  useEffect(() => {
    reload();
  }, []);
  const loading = false;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar pageTitle="Product Catalog" pageSubtitle="Manage products" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4 flex justify-end">
            <Button asChild>
              <a href="/inventory/product-catalog/add-product">Add Product</a>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 w-32 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.category || "-"}</td>
                    <td className="px-4 py-2">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p.sellingPrice ?? 0)}</td>
                    <td className="px-4 py-2">{p.minStock ?? 0}-{p.maxStock ?? 0}</td>
                    <td className="px-4 py-2">{p.isActive ? "Active" : "Inactive"}</td>
                    <td className="px-4 py-2 text-center">
                      <ProductActions
                          product={p}
                          editLink={`/inventory/product-catalog/edit/${p.id}`}
                          onPricing={(data) => updatePricing(p.id, data)}
                          onStock={(data) => updateStock(p.id, data)}
                          onDeactivate={() => deactivateProduct(p.id)}
                          history={getHistory(p.id)}
                        />
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-muted-foreground">
                      {loading ? "Loading products..." : "No products found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
