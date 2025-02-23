"use client"

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Location } from '@/types/location';

export interface Product {
  code: string;
  name: string;
  quantityPerCase: number;
  totalCases: number;
  totalQuantity: number;
  locations: Location[];
  minimumStock: number;
}

interface InventoryHistory {
  id: string;
  timestamp: Date;
  productCode: string;
  type: 'inbound' | 'outbound' | 'move';
  cases: number;
  quantity: number;
  fromLocation?: Location;
  toLocation?: Location;
}

interface ShelfConfig {
  positions: number;
  levels: number;
}

interface ProductStore {
  products: Product[];
  history: InventoryHistory[];
  shelfConfigs: Record<string, ShelfConfig>;
  setProducts: (products: Product[]) => void;
  setShelfConfigs: (configs: Record<string, ShelfConfig>) => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (code: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (code: string) => Promise<void>;
  addHistory: (data: Omit<InventoryHistory, 'id' | 'timestamp'>) => Promise<void>;
  setShelfConfig: (column: string, config: ShelfConfig) => Promise<void>;
  deleteShelfConfig: (column: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  history: [],
  shelfConfigs: {},
  setProducts: (products) => set({ products }),
  setShelfConfigs: (configs) => set({ shelfConfigs: configs }),
  addProduct: async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          code: product.code,
          name: product.name,
          quantity_per_case: product.quantityPerCase,
          total_cases: product.totalCases,
          total_quantity: product.totalQuantity,
          minimum_stock: product.minimumStock,
        }]);
      
      if (error) throw error;
      
      set((state) => ({
        products: [...state.products, product]
      }));
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },
  updateProduct: async (code, updates) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          quantity_per_case: updates.quantityPerCase,
          total_cases: updates.totalCases,
          total_quantity: updates.totalQuantity,
          minimum_stock: updates.minimumStock,
        })
        .eq('code', code);
      
      if (error) throw error;
      
      set((state) => ({
        products: state.products.map((p) =>
          p.code === code ? { ...p, ...updates } : p
        )
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  deleteProduct: async (code) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('code', code);
      
      if (error) throw error;
      
      set((state) => ({
        products: state.products.filter((p) => p.code !== code)
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
  addHistory: async (data) => {
    try {
      const { error } = await supabase
        .from('inventory_history')
        .insert([{
          product_code: data.productCode,
          type: data.type,
          cases: data.cases,
          quantity: data.quantity,
          from_column: data.fromLocation?.column,
          from_position: data.fromLocation?.position,
          from_level: data.fromLocation?.level,
          to_column: data.toLocation?.column,
          to_position: data.toLocation?.position,
          to_level: data.toLocation?.level,
        }]);
      
      if (error) throw error;
      
      set((state) => ({
        history: [
          {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            ...data
          },
          ...state.history
        ]
      }));
    } catch (error) {
      console.error('Error adding history:', error);
      throw error;
    }
  },
  setShelfConfig: async (column, config) => {
    try {
      const { error } = await supabase
        .from('shelf_configs')
        .upsert([{
          column,
          positions: config.positions,
          levels: config.levels,
        }]);
      
      if (error) throw error;
      
      set((state) => ({
        shelfConfigs: {
          ...state.shelfConfigs,
          [column]: config
        }
      }));
    } catch (error) {
      console.error('Error setting shelf config:', error);
      throw error;
    }
  },
  deleteShelfConfig: async (column) => {
    try {
      const { error } = await supabase
        .from('shelf_configs')
        .delete()
        .eq('column', column);
      
      if (error) throw error;
      
      set((state) => {
        const newConfigs = { ...state.shelfConfigs };
        delete newConfigs[column];
        return { shelfConfigs: newConfigs };
      });
    } catch (error) {
      console.error('Error deleting shelf config:', error);
      throw error;
    }
  }
}));