-- Add three configurable commercial plans and support up to three product images.
-- Safe additive migration: existing products keep image_url; existing shops use formule_1.
ALTER TABLE shops ADD COLUMN plan_key TEXT NOT NULL DEFAULT 'formule_1';
ALTER TABLE products ADD COLUMN image_url_2 TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN image_url_3 TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_shops_plan ON shops(plan_key);
