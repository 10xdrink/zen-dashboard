import { API_BASE_URL } from "@/utils/constants";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  sku?: string;
  description?: string;
  costPrice?: number;
  sellingPrice?: number;
  discount?: number;
  taxCategory?: string;
  minStock?: number;
  maxStock?: number;
  reorderPoint?: number;
  storageRequirements?: string;
  isActive: boolean;
}

export interface PricingUpdate {
  costPrice?: number;
  sellingPrice?: number;
  discount?: number;
  taxCategory?: string;
}

export interface StockUpdate {
  minStock?: number;
  maxStock?: number;
  reorderPoint?: number;
}

const headers = {
  "Content-Type": "application/json",
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/products`);
    return handleResponse<Product[]>(res);
  },

  async getById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse<Product>(res);
  },

  async create(data: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(res);
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(res);
  },

  async updatePricing(id: string, data: PricingUpdate): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}/pricing`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(res);
  },

  async updateStock(id: string, data: StockUpdate): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(res);
  },

  async getHistory(id: string): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/products/${id}/history`);
    return handleResponse<any[]>(res);
  },

  async deactivate(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/products/${id}/deactivate`, {
      method: "PATCH",
      headers,
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }
  },
};
