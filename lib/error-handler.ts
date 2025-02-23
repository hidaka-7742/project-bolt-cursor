"use client"

import { PostgrestError } from '@supabase/supabase-js';
import { errorMessages } from './error-messages';

interface ErrorDetails {
  title: string;
  description: string;
}

export function handleDatabaseError(
  error: PostgrestError | Error | unknown,
  context: {
    operation: 'create' | 'update' | 'delete' | 'fetch';
    resource: 'products' | 'locations' | 'shelf_configs' | 'inventory_history';
  }
): ErrorDetails {
  // PostgrestErrorの場合
  if (error instanceof Object && 'code' in error) {
    const pgError = error as PostgrestError;
    
    // 一般的なデータベースエラー
    switch (pgError.code) {
      case '23505': // unique_violation
        return {
          title: "一意制約エラー",
          description: errorMessages.unique_violation
        };
      case '23503': // foreign_key_violation
        return {
          title: "外部キー制約エラー",
          description: errorMessages.foreign_key_violation
        };
      case '23514': // check_violation
        return {
          title: "チェック制約エラー",
          description: errorMessages.check_violation
        };
      case '23502': // not_null_violation
        return {
          title: "NULL制約エラー",
          description: errorMessages.not_null_violation
        };
      case '42501': // insufficient_privilege
        return {
          title: "権限エラー",
          description: errorMessages.unauthorized
        };
    }
  }

  // ネットワークエラーの場合
  if (error instanceof Error && error.name === 'NetworkError') {
    return {
      title: "ネットワークエラー",
      description: errorMessages.network
    };
  }

  // リソース固有のエラーメッセージを返す
  return {
    title: "エラー",
    description: errorMessages[context.resource][context.operation]
  };
}