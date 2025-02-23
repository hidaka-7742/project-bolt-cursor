/*
  # Initial schema for warehouse management system

  1. New Tables
    - `products`
      - `code` (text, primary key) - 商品コード
      - `name` (text) - 商品名
      - `quantity_per_case` (integer) - ケースあたりの数量
      - `total_cases` (integer) - 総ケース数
      - `total_quantity` (integer) - 総在庫数
      - `minimum_stock` (integer) - 最小在庫数
      - `created_at` (timestamptz) - 作成日時
      - `updated_at` (timestamptz) - 更新日時

    - `locations`
      - `id` (uuid, primary key) - 場所ID
      - `product_code` (text) - 商品コード
      - `column` (text) - 列
      - `position` (text) - 番目
      - `level` (text) - レベル
      - `cases` (integer) - ケース数
      - `created_at` (timestamptz) - 作成日時
      - `updated_at` (timestamptz) - 更新日時

    - `shelf_configs`
      - `column` (text, primary key) - 列
      - `positions` (integer) - 番目の数
      - `levels` (integer) - レベル数
      - `created_at` (timestamptz) - 作成日時
      - `updated_at` (timestamptz) - 更新日時

    - `inventory_history`
      - `id` (uuid, primary key) - 履歴ID
      - `product_code` (text) - 商品コード
      - `type` (text) - 操作タイプ (inbound/outbound/move)
      - `cases` (integer) - ケース数
      - `quantity` (integer) - 数量
      - `from_column` (text) - 移動元の列
      - `from_position` (text) - 移動元の番目
      - `from_level` (text) - 移動元のレベル
      - `to_column` (text) - 移動先の列
      - `to_position` (text) - 移動先の番目
      - `to_level` (text) - 移動先のレベル
      - `created_at` (timestamptz) - 作成日時

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and write data
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  code text PRIMARY KEY,
  name text NOT NULL,
  quantity_per_case integer NOT NULL,
  total_cases integer NOT NULL DEFAULT 0,
  total_quantity integer NOT NULL DEFAULT 0,
  minimum_stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text REFERENCES products(code) ON DELETE CASCADE,
  "column" text NOT NULL,
  position text NOT NULL,
  level text NOT NULL,
  cases integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read locations"
  ON locations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert locations"
  ON locations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update locations"
  ON locations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete locations"
  ON locations
  FOR DELETE
  TO authenticated
  USING (true);

-- Shelf configurations table
CREATE TABLE IF NOT EXISTS shelf_configs (
  "column" text PRIMARY KEY,
  positions integer NOT NULL,
  levels integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shelf_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read shelf_configs"
  ON shelf_configs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert shelf_configs"
  ON shelf_configs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update shelf_configs"
  ON shelf_configs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete shelf_configs"
  ON shelf_configs
  FOR DELETE
  TO authenticated
  USING (true);

-- Inventory history table
CREATE TABLE IF NOT EXISTS inventory_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text REFERENCES products(code) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('inbound', 'outbound', 'move')),
  cases integer NOT NULL,
  quantity integer NOT NULL,
  from_column text,
  from_position text,
  from_level text,
  to_column text,
  to_position text,
  to_level text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read inventory_history"
  ON inventory_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert inventory_history"
  ON inventory_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Updated triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_shelf_configs_updated_at
  BEFORE UPDATE ON shelf_configs
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();