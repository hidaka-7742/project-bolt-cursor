"use client"

import { useEffect, useState } from 'react';
import { supabase, type Products, type Locations, type ShelfConfigs, type InventoryHistory } from '@/lib/supabase';
import { useToast } from './use-toast';
import { RealtimeChannel } from '@supabase/supabase-js';
import { handleDatabaseError } from '@/lib/error-handler';

export function useSupabase() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [shelfConfigs, setShelfConfigs] = useState<ShelfConfigs[]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistory[]>([]);
  const [channels, setChannels] = useState<RealtimeChannel[]>([]);

  // データ取得関数
  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'fetch',
        resource: 'products'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }

  async function fetchLocations() {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLocations(data || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'fetch',
        resource: 'locations'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }

  async function fetchShelfConfigs() {
    try {
      const { data, error } = await supabase
        .from('shelf_configs')
        .select('*')
        .order('column', { ascending: true });
      
      if (error) throw error;
      setShelfConfigs(data || []);
    } catch (err) {
      console.error('Error fetching shelf configs:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'fetch',
        resource: 'shelf_configs'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }

  async function fetchInventoryHistory() {
    try {
      const { data, error } = await supabase
        .from('inventory_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setInventoryHistory(data || []);
    } catch (err) {
      console.error('Error fetching inventory history:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'fetch',
        resource: 'inventory_history'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }

  // データ作成関数
  async function createProduct(data: Products['Insert']) {
    try {
      const { error } = await supabase
        .from('products')
        .insert([data]);
      
      if (error) throw error;
      
      toast({
        title: "登録完了",
        description: "商品を登録しました。",
      });

      await fetchProducts();
    } catch (err) {
      console.error('Error creating product:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'create',
        resource: 'products'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function createLocation(data: Locations['Insert']) {
    try {
      const { error } = await supabase
        .from('locations')
        .insert([data]);
      
      if (error) throw error;
      
      toast({
        title: "登録完了",
        description: "保管場所を登録しました。",
      });

      await fetchLocations();
    } catch (err) {
      console.error('Error creating location:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'create',
        resource: 'locations'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function createShelfConfig(data: ShelfConfigs['Insert']) {
    try {
      const { error } = await supabase
        .from('shelf_configs')
        .insert([data]);
      
      if (error) throw error;
      
      toast({
        title: "登録完了",
        description: "棚設定を登録しました。",
      });

      await fetchShelfConfigs();
    } catch (err) {
      console.error('Error creating shelf config:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'create',
        resource: 'shelf_configs'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  // データ更新関数
  async function updateProduct(code: string, updates: Products['Update']) {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('code', code);
      
      if (error) throw error;
      
      toast({
        title: "更新完了",
        description: "商品情報を更新しました。",
      });

      await fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'update',
        resource: 'products'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function updateLocation(id: string, updates: Locations['Update']) {
    try {
      const { error } = await supabase
        .from('locations')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "更新完了",
        description: "保管場所を更新しました。",
      });

      await fetchLocations();
    } catch (err) {
      console.error('Error updating location:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'update',
        resource: 'locations'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function updateShelfConfig(column: string, updates: ShelfConfigs['Update']) {
    try {
      const { error } = await supabase
        .from('shelf_configs')
        .update(updates)
        .eq('column', column);
      
      if (error) throw error;
      
      toast({
        title: "更新完了",
        description: "棚設定を更新しました。",
      });

      await fetchShelfConfigs();
    } catch (err) {
      console.error('Error updating shelf config:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'update',
        resource: 'shelf_configs'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  // データ削除関数
  async function deleteProduct(code: string) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('code', code);
      
      if (error) throw error;
      
      toast({
        title: "削除完了",
        description: "商品を削除しました。",
      });

      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'delete',
        resource: 'products'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function deleteLocation(id: string) {
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "削除完了",
        description: "保管場所を削除しました。",
      });

      await fetchLocations();
    } catch (err) {
      console.error('Error deleting location:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'delete',
        resource: 'locations'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  async function deleteShelfConfig(column: string) {
    try {
      const { error } = await supabase
        .from('shelf_configs')
        .delete()
        .eq('column', column);
      
      if (error) throw error;
      
      toast({
        title: "削除完了",
        description: "棚設定を削除しました。",
      });

      await fetchShelfConfigs();
    } catch (err) {
      console.error('Error deleting shelf config:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'delete',
        resource: 'shelf_configs'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  // 在庫履歴の追加
  async function addInventoryHistory(data: InventoryHistory['Insert']) {
    try {
      const { error } = await supabase
        .from('inventory_history')
        .insert([data]);
      
      if (error) throw error;
      
      await fetchInventoryHistory();
    } catch (err) {
      console.error('Error adding inventory history:', err);
      const { title, description } = handleDatabaseError(err, {
        operation: 'create',
        resource: 'inventory_history'
      });
      toast({
        title,
        description,
        variant: "destructive",
      });
      throw err;
    }
  }

  // リアルタイム更新の設定
  useEffect(() => {
    const setupRealtimeSubscriptions = () => {
      const productChannel = supabase
        .channel('products')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'products'
        }, () => {
          fetchProducts();
        })
        .subscribe();

      const locationChannel = supabase
        .channel('locations')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'locations'
        }, () => {
          fetchLocations();
        })
        .subscribe();

      const shelfConfigChannel = supabase
        .channel('shelf_configs')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'shelf_configs'
        }, () => {
          fetchShelfConfigs();
        })
        .subscribe();

      const historyChannel = supabase
        .channel('inventory_history')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'inventory_history'
        }, () => {
          fetchInventoryHistory();
        })
        .subscribe();

      setChannels([productChannel, locationChannel, shelfConfigChannel, historyChannel]);
    };

    // 初期データの取得
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchProducts(),
          fetchLocations(),
          fetchShelfConfigs(),
          fetchInventoryHistory()
        ]);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    setupRealtimeSubscriptions();

    // クリーンアップ
    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, []);

  return {
    isLoading,
    error,
    products,
    locations,
    shelfConfigs,
    inventoryHistory,
    // データ取得
    fetchProducts,
    fetchLocations,
    fetchShelfConfigs,
    fetchInventoryHistory,
    // データ作成
    createProduct,
    createLocation,
    createShelfConfig,
    // データ更新
    updateProduct,
    updateLocation,
    updateShelfConfig,
    // データ削除
    deleteProduct,
    deleteLocation,
    deleteShelfConfig,
    // 在庫履歴
    addInventoryHistory,
  };
}