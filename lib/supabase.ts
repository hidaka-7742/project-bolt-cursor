"use client"

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type Products = Tables['products']['Row'];
export type Locations = Tables['locations']['Row'];
export type ShelfConfigs = Tables['shelf_configs']['Row'];
export type InventoryHistory = Tables['inventory_history']['Row'];