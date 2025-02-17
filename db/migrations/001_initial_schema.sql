-- 001_initial_schema.sql

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  name varchar(255),
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text,
  price int NOT NULL,        -- storing price in cents
  currency varchar(3) NOT NULL DEFAULT 'USD',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  status varchar(50) NOT NULL DEFAULT 'pending', 
  total_amount int,                             -- total in cents
  currency varchar(3) NOT NULL DEFAULT 'USD',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- ORDER_ITEMS TABLE (many-to-many bridge between orders and products)
CREATE TABLE IF NOT EXISTS order_items (
  id serial PRIMARY KEY,
  order_id int NOT NULL,
  product_id int NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  price_each int NOT NULL,   -- price of the product at the time of purchase (cents)
  currency varchar(3) NOT NULL DEFAULT 'USD'
);

-- PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id serial PRIMARY KEY,
  order_id int NOT NULL,
  stripe_payment_id varchar(255) UNIQUE,
  amount int NOT NULL,       -- payment amount in cents
  currency varchar(3) NOT NULL DEFAULT 'USD',
  status varchar(50) NOT NULL DEFAULT 'pending', 
  created_at timestamp NOT NULL DEFAULT now()
);

-- FOREIGN KEYS
ALTER TABLE orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE order_items
  ADD CONSTRAINT order_items_order_id_fkey
  FOREIGN KEY (order_id) REFERENCES orders(id);

ALTER TABLE order_items
  ADD CONSTRAINT order_items_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE payments
  ADD CONSTRAINT payments_order_id_fkey
  FOREIGN KEY (order_id) REFERENCES orders(id);