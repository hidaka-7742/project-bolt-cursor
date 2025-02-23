"use client"

import { PostgrestError } from '@supabase/supabase-js';
import { errorMessages as databaseErrorMessages } from './error-messages';

// 操作の型を定義
type Operation = 'create' | 'update' | 'delete' | 'fetch';
type Resource = 'products' | 'locations' | 'shelf_configs' | 'inventory_history';

interface ErrorContext {
  operation: Operation;
  resource: Resource;
}

// リソース別のエラーメッセージを定義
const resourceErrorMessages = {
  products: {
    create: "商品の登録に失敗しました。",
    update: "商品情報の更新に失敗しました。",
    delete: "商品の削除に失敗しました。",
    fetch: "商品データの取得に失敗しました。",
    duplicate_code: "この商品コードは既に使用されています。",
    invalid_quantity: "数量は0より大きい値を入力してください。",
    invalid_minimum_stock: "最小在庫数は0以上の値を入力してください。"
  },
  locations: {
    create: "保管場所の登録に失敗しました。",
    update: "保管場所の更新に失敗しました。",
    delete: "保管場所の削除に失敗しました。",
    fetch: "保管場所データの取得に失敗しました。"
  },
  shelf_configs: {
    create: "棚設定の登録に失敗しました。",
    update: "棚設定の更新に失敗しました。",
    delete: "棚設定の削除に失敗しました。",
    fetch: "棚設定データの取得に失敗しました。"
  },
  inventory_history: {
    create: "在庫履歴の登録に失敗しました。",
    update: "在庫履歴の更新に失敗しました。",
    delete: "在庫履歴の削除に失敗しました。",
    fetch: "在庫履歴データの取得に失敗しました。"
  }
} as const;

interface ErrorDetails {
  title: string;
  description: string;
}

export function handleDatabaseError(error: unknown, context: ErrorContext): ErrorDetails {
  const defaultError = {
    title: "エラー",
    description: resourceErrorMessages[context.resource][context.operation]
  };

  if (error instanceof Error) {
    // エラー固有の処理をここに追加
    return defaultError;
  }

  return defaultError;
}