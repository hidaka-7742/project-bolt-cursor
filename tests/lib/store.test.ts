import { describe, it, expect, beforeEach } from 'vitest';
import { useProductStore } from '@/lib/store';

describe('ProductStore', () => {
  beforeEach(() => {
    useProductStore.setState({
      products: [],
      history: [],
      shelfConfigs: {},
    });
  });

  it('should add a product', async () => {
    const store = useProductStore.getState();
    const product = {
      code: 'PRD001',
      name: 'プレミアムコーヒー豆',
      quantityPerCase: 24,
      totalCases: 50,
      totalQuantity: 1200,
      locations: [],
      minimumStock: 800,
    };

    await store.addProduct(product);
    expect(useProductStore.getState().products).toHaveLength(1);
    expect(useProductStore.getState().products[0]).toEqual(product);
  });

  it('should update a product', async () => {
    const store = useProductStore.getState();
    const product = {
      code: 'PRD001',
      name: 'プレミアムコーヒー豆',
      quantityPerCase: 24,
      totalCases: 50,
      totalQuantity: 1200,
      locations: [],
      minimumStock: 800,
    };

    await store.addProduct(product);
    await store.updateProduct('PRD001', { name: '特選コーヒー豆' });

    expect(useProductStore.getState().products[0].name).toBe('特選コーヒー豆');
  });
});