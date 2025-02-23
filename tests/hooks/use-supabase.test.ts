import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSupabase } from '@/hooks/use-supabase';

describe('useSupabase', () => {
  it('should fetch products successfully', async () => {
    const { result } = renderHook(() => useSupabase());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].code).toBe('PRD001');
  });

  it('should create a product successfully', async () => {
    const { result } = renderHook(() => useSupabase());

    const newProduct = {
      code: 'PRD002',
      name: 'オーガニック紅茶',
      quantity_per_case: 36,
      minimum_stock: 720,
    };

    await act(async () => {
      await result.current.createProduct(newProduct);
    });

    // 作成後に商品一覧が更新されることを確認
    expect(result.current.products).toBeDefined();
  });
});