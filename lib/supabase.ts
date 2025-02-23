"use client"

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];

// 各テーブルの型定義を修正
export type Products = Tables['products']['Row'];
export type ProductsInsert = Tables['products']['Insert'];
export type ProductsUpdate = Tables['products']['Update'];

export type Locations = Tables['locations']['Row'];
export type LocationsInsert = Tables['locations']['Insert'];
export type LocationsUpdate = Tables['locations']['Update'];

export type ShelfConfigs = Tables['shelf_configs']['Row'];
export type ShelfConfigsInsert = Tables['shelf_configs']['Insert'];
export type ShelfConfigsUpdate = Tables['shelf_configs']['Update'];

export type InventoryHistory = Tables['inventory_history']['Row'];
export type InventoryHistoryInsert = Tables['inventory_history']['Insert'];
export type InventoryHistoryUpdate = Tables['inventory_history']['Update'];