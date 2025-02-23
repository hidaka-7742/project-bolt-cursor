"use client"

// エラーメッセージの定義
export const errorMessages = {
  // 一般的なエラー
  default: "予期せぬエラーが発生しました。",
  network: "ネットワークエラーが発生しました。インターネット接続を確認してください。",
  unauthorized: "認証エラーが発生しました。再度ログインしてください。",
  
  // データベースエラー
  unique_violation: "一意制約違反: 同じデータが既に存在します。",
  foreign_key_violation: "外部キー制約違反: 関連するデータが存在しません。",
  check_violation: "チェック制約違反: 入力値が制約に違反しています。",
  not_null_violation: "NULL制約違反: 必須項目が入力されていません。",
  
  // カスタムエラー
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
    fetch: "保管場所データの取得に失敗しました。",
    invalid_position: "無効な保管場所が指定されています。",
    cases_exceeded: "指定された数量が最大保管可能数を超えています。"
  },
  shelf_configs: {
    create: "棚設定の登録に失敗しました。",
    update: "棚設定の更新に失敗しました。",
    delete: "棚設定の削除に失敗しました。",
    fetch: "棚設定の取得に失敗しました。",
    invalid_config: "無効な棚設定です。",
    has_inventory: "在庫が存在するため削除できません。"
  },
  inventory_history: {
    create: "在庫履歴の記録に失敗しました。",
    fetch: "在庫履歴の取得に失敗しました。",
    invalid_quantity: "無効な数量が指定されています。",
    insufficient_stock: "在庫が不足しています。"
  }
} as const;