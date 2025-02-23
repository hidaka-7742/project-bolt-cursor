export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          code: string
          name: string
          quantity_per_case: number
          total_cases: number
          total_quantity: number
          minimum_stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          code: string
          name: string
          quantity_per_case: number
          total_cases?: number
          total_quantity?: number
          minimum_stock: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          code?: string
          name?: string
          quantity_per_case?: number
          total_cases?: number
          total_quantity?: number
          minimum_stock?: number
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          product_code: string
          column: string
          position: string
          level: string
          cases: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_code: string
          column: string
          position: string
          level: string
          cases: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_code?: string
          column?: string
          position?: string
          level?: string
          cases?: number
          created_at?: string
          updated_at?: string
        }
      }
      shelf_configs: {
        Row: {
          column: string
          positions: number
          levels: number
          created_at: string
          updated_at: string
        }
        Insert: {
          column: string
          positions: number
          levels: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          column?: string
          positions?: number
          levels?: number
          created_at?: string
          updated_at?: string
        }
      }
      inventory_history: {
        Row: {
          id: string
          product_code: string
          type: 'inbound' | 'outbound' | 'move'
          cases: number
          quantity: number
          from_column: string | null
          from_position: string | null
          from_level: string | null
          to_column: string | null
          to_position: string | null
          to_level: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_code: string
          type: 'inbound' | 'outbound' | 'move'
          cases: number
          quantity: number
          from_column?: string | null
          from_position?: string | null
          from_level?: string | null
          to_column?: string | null
          to_position?: string | null
          to_level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_code?: string
          type?: 'inbound' | 'outbound' | 'move'
          cases?: number
          quantity?: number
          from_column?: string | null
          from_position?: string | null
          from_level?: string | null
          to_column?: string | null
          to_position?: string | null
          to_level?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}