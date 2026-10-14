-- BeninPublio core foundation (additive migration).
-- Apply once to the existing beninpublio-db only after a database backup.
ALTER TABLE shops ADD COLUMN page_type TEXT NOT NULL DEFAULT 'shop';
ALTER TABLE shops ADD COLUMN template_key TEXT NOT NULL DEFAULT 'atelier';
ALTER TABLE shops ADD COLUMN primary_color TEXT NOT NULL DEFAULT '#102b46';
ALTER TABLE shops ADD COLUMN accent_color TEXT NOT NULL DEFAULT '#25c9b1';
ALTER TABLE shops ADD COLUMN cover_image TEXT NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN published INTEGER NOT NULL DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_shops_active_published ON shops(active, published);
