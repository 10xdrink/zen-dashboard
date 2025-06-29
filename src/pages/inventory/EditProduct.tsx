import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { productService } from "@/services/productService";
import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Product } from "@/services/productService";

// Same validation schema as AddProduct
const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  brand: yup.string().nullable(),
  category: yup.string().nullable(),
  sku: yup.string().nullable(),
  costPrice: yup.number().typeError("Number required").positive().nullable(),
  sellingPrice: yup.number().typeError("Number required").positive().nullable(),
  discount: yup.number().min(0).max(100).nullable(),
  taxCategory: yup.string().nullable(),
  minStock: yup.number().integer().nullable(),
  maxStock: yup.number().integer().nullable(),
  reorderPoint: yup.number().integer().nullable(),
  storageRequirements: yup.string().nullable(),
  description: yup.string().nullable(),
  usageInstructions: yup.string().nullable(),
  sideEffects: yup.string().nullable(),
  primarySupplier: yup.string().nullable(),
  alternativeSuppliers: yup.string().nullable(),
  leadTime: yup.number().integer().nullable(),
  paymentTerms: yup.string().nullable(),
  image: yup.mixed<any>().nullable(),
});

type ProductFormValues = yup.InferType<typeof productSchema>;
const steps = ["Basic Info","Pricing","Stock","Additional","Vendor"];

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, formState: { errors, isSubmitting }, trigger, watch, reset } = 
    useForm<ProductFormValues>({
      resolver: yupResolver(productSchema),
      defaultValues: {} as ProductFormValues,
    });

  const fileList = watch("image");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (fileList?.length) {
      const url = URL.createObjectURL(fileList[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fileList]);

  // fetch product
  useEffect(() => {
    (async () => {
      try {
        const product: Product = await productService.getById(id!);
        const { imageUrl, ...rest } = product as any;
        reset({ ...rest, image: null });
      } catch (e: any) {
        // fallback to dummy data if backend unavailable
        const dummyProducts: Product[] = [
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
          },
          {
            id: "p3",
            name: "Vitamin C Serum",
            category: "Beauty Products",
            brand: "GlowPlus",
            sellingPrice: 2075,
            costPrice: 12,
            minStock: 50,
            maxStock: 500,
            reorderPoint: 60,
            isActive: true,
          },
        ] as any;
        const fallback = dummyProducts.find(p => p.id === id);
        if (fallback) {
          reset({ ...(fallback as any), image: null });
        } else {
          toast.error("Product not found");
          navigate(-1);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate, reset]);

  const nextStep = async () => {
    if (await trigger()) setStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await toast.promise(
        new Promise(res=>setTimeout(res,1000)), // mock update
        { loading: "Updating...", success: "Updated!", error: (e) => e.message }
      );
      navigate("/inventory/product-catalog");
    } catch {}
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Edit Product" pageSubtitle="Update product details" />
        <div className="flex-1 overflow-y-auto py-4">
          <div className="max-w-4xl mx-auto px-4">

            {/* Progress */}
            <div className="mb-4 mt-20">
              <Progress value={((step + 1) / steps.length) * 100} className="h-1" />
              <div className="flex justify-between text-xs mt-1">
                {steps.map((label, i) => (
                  <div key={i} className={i === step ? "text-green-600" : i < step ? "text-gray-500" : "text-gray-300"}>{label}</div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Reuse same step components as AddProduct – copied for brevity */}
              {step === 0 && (
                <Card className="shadow-lg">
                  <CardContent className="grid gap-6 md:grid-cols-2 p-6">
                    {/* Fields list identical to AddProduct basic */}
                    {[
                      { key: "name", label: "Product Name*", placeholder: "Enter name" },
                      { key: "brand", label: "Brand", placeholder: "Enter brand" },
                      { key: "category", label: "Category", placeholder: "Enter category" },
                      { key: "sku", label: "SKU", placeholder: "Enter SKU" }
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller name={key as any} control={control} render={({ field }) => (
                          <Input {...field} className="bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded h-10" placeholder={placeholder} />
                        )} />
                        {errors[key as keyof typeof errors] && <p className="text-red-500 text-xs mt-1">{String(errors[key as keyof typeof errors]?.message)}</p>}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              {step === 1 && (
                <Card className="shadow-lg">
                  <CardContent className="grid md:grid-cols-4 gap-4 p-4">
                    {[
                      { key: "costPrice", label: "Cost Price" },
                      { key: "sellingPrice", label: "Selling Price" },
                      { key: "discount", label: "Discount (%)" },
                      { key: "taxCategory", label: "Tax Category" }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} className="bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded h-10" placeholder={label} type={key === "taxCategory" ? "text" : "number"} />
                          )}
                        />
                        {errors[key as keyof typeof errors] && (
                          <p className="text-red-500 text-xs mt-1">{String(errors[key as keyof typeof errors]?.message)}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="shadow-lg">
                  <CardContent className="grid md:grid-cols-4 gap-4 p-4">
                    {[
                      { key: "minStock", label: "Min Stock" },
                      { key: "maxStock", label: "Max Stock" },
                      { key: "reorderPoint", label: "Reorder Point" },
                      { key: "storageRequirements", label: "Storage Req." }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} className="bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded h-10" placeholder={label} />
                          )}
                        />
                        {errors[key as keyof typeof errors] && (
                          <p className="text-red-500 text-xs mt-1">{String(errors[key as keyof typeof errors]?.message)}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="shadow-lg">
                  <CardContent className="space-y-4 p-4">
                    {[
                      { key: "description", label: "Description", component: Textarea },
                      { key: "usageInstructions", label: "Usage Instructions", component: Textarea },
                      { key: "sideEffects", label: "Side Effects", component: Textarea }
                    ].map(({ key, label, component: C }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <C {...field} className="bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded h-24" placeholder={label} />
                          )}
                        />
                        {errors[key as keyof typeof errors] && (
                          <p className="text-red-500 text-xs mt-1">{String(errors[key as keyof typeof errors]?.message)}</p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm mb-1">Product Image</label>
                      <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                          <input type="file" accept="image/*" onChange={e => field.onChange(e.target.files)} className="text-sm" />
                        )}
                      />
                      {previewUrl && <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card className="shadow-lg">
                  <CardContent className="grid md:grid-cols-4 gap-4 p-4">
                    {[
                      { key: "primarySupplier", label: "Primary Supplier" },
                      { key: "alternativeSuppliers", label: "Alt. Suppliers" },
                      { key: "leadTime", label: "Lead Time (days)" },
                      { key: "paymentTerms", label: "Payment Terms" }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} className="bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded h-10" placeholder={label} />
                          )}
                        />
                        {errors[key as keyof typeof errors] && (
                          <p className="text-red-500 text-xs mt-1">{String(errors[key as keyof typeof errors]?.message)}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                {step > 0 ? (
                  <Button type="button" variant="secondary" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
                ) : <div />}
                {step < steps.length - 1 ? (
                  <Button type="button" size="sm" onClick={nextStep}>Next</Button>
                ) : (
                  <Button type="submit" size="sm" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update Product"}</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
