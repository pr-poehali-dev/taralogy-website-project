CREATE TABLE IF NOT EXISTS t_p82040590_taralogy_website_pro.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id VARCHAR(100) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  amount INTEGER NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  card_name VARCHAR(100),
  card_emoji VARCHAR(10),
  card_full TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);