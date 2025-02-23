import { test, expect } from '@playwright/test';

test('inventory management workflow', async ({ page }) => {
  // ログインページにアクセス
  await page.goto('/login');

  // ログイン処理（実際の認証フローに合わせて調整）
  await page.fill('input[type="email"]', 'staff@warehouse.com');
  await page.click('button[type="submit"]');

  // ダッシュボードに遷移したことを確認
  await expect(page).toHaveURL('/');
  await expect(page.getByText('倉庫管理システム')).toBeVisible();

  // 商品管理画面に移動
  await page.getByText('商品管理').click();

  // 新規商品登録
  await page.getByText('商品登録').click();
  await page.fill('input[name="code"]', 'TEST001');
  await page.fill('input[name="name"]', 'テスト商品');
  await page.fill('input[name="quantityPerCase"]', '24');
  await page.fill('input[name="minimumStock"]', '100');
  await page.getByText('登録').click();

  // 登録成功のトーストメッセージを確認
  await expect(page.getByText('商品登録完了')).toBeVisible();

  // 登録した商品が一覧に表示されることを確認
  await expect(page.getByText('TEST001')).toBeVisible();
  await expect(page.getByText('テスト商品')).toBeVisible();
});