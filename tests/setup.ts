import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// MSWサーバーの設定
export const server = setupServer(
  // Supabaseのモックハンドラー
  http.get('*/rest/v1/products*', () => {
    return HttpResponse.json([
      {
        code: "PRD001",
        name: "プレミアムコーヒー豆",
        quantity_per_case: 24,
        total_cases: 50,
        total_quantity: 1200,
        minimum_stock: 800,
      }
    ]);
  }),
  
  http.post('*/rest/v1/products', () => {
    return HttpResponse.json({ id: 1 });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());