"use client"

import { useProductStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Product } from "@/lib/store";

export function ShelfView() {
  const { products, shelfConfigs } = useProductStore();
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  // 利用可能な列を取得
  const columns = Object.keys(shelfConfigs).sort();

  // 特定の位置の商品を取得
  const getProductAtLocation = (column: string, position: number, level: number) => {
    return products.find(product => 
      product.locations.some(loc => 
        loc.column === column && 
        Number(loc.position) === position && 
        Number(loc.level) === level
      )
    );
  };

  // 特定の位置の在庫数を取得
  const getCasesAtLocation = (column: string, position: number, level: number) => {
    const product = products.find(product => 
      product.locations.some(loc => 
        loc.column === column && 
        Number(loc.position) === position && 
        Number(loc.level) === level
      )
    );
    
    if (!product) return 0;
    
    const location = product.locations.find(loc => 
      loc.column === column && 
      Number(loc.position) === position && 
      Number(loc.level) === level
    );
    
    return location?.cases || 0;
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>棚表示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[auto,1fr] gap-4">
            {/* 列選択 */}
            <div className="space-y-2">
              {columns.map(column => (
                <button
                  key={column}
                  className={`w-full px-4 py-2 text-left rounded ${
                    selectedColumn === column 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedColumn(column)}
                >
                  {column}列
                </button>
              ))}
            </div>

            {/* 棚の表示 */}
            {selectedColumn && shelfConfigs[selectedColumn] && (
              <div className="border rounded p-4">
                <div className="grid gap-4" style={{
                  gridTemplateColumns: `repeat(${shelfConfigs[selectedColumn].positions}, 1fr)`
                }}>
                  {Array.from({ length: shelfConfigs[selectedColumn].positions }, (_, position) => (
                    <div key={position} className="space-y-2">
                      {Array.from({ length: shelfConfigs[selectedColumn].levels }, (_, level) => {
                        const product = getProductAtLocation(selectedColumn, position + 1, level + 1);
                        const cases = getCasesAtLocation(selectedColumn, position + 1, level + 1);
                        
                        return (
                          <div
                            key={level}
                            className="border rounded p-2 min-h-[100px] flex flex-col justify-between"
                          >
                            <div className="text-sm text-muted-foreground">
                              {position + 1}番目 レベル{level + 1}
                            </div>
                            {product ? (
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm">{cases}ケース</div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">空</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 