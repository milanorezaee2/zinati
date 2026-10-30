/*
# Add themed categories, stone-category links and richer photos

1. New Tables
- `categories`: themed collections shown on the home page and on their own landing pages. Each has a URL slug, a name, a short tagline, a longer description, a cover photo and a display order.
- `stone_categories`: links each stone to one or more categories. A stone can belong to several categories, so related categories and related stones can be found.

2. Changed Data
- Existing stones keep their main type (precious, decorative, collectible). Their photo lists are refreshed with three or four photos where available.
- Six new stones are added (codes GH-010 to GH-015) with varied types, colours and availability.
- Seven categories are seeded: geodes, rare finds, blue treasures, green harmony, warm tones, minimal black and calm pink.

3. Security
- RLS enabled on both new tables.
- Public read-only access for anon and authenticated roles. No write policies are added, so visitors cannot change categories or links.

4. Notes
- Every statement is safe to run again: tables use IF NOT EXISTS, inserts use ON CONFLICT, and policies are dropped before being created.
- Existing columns are not removed or changed.
- Names, origins, descriptions and photos are still sample content.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  cover_image text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stone_categories (
  stone_id uuid NOT NULL REFERENCES stones(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (stone_id, category_id)
);

CREATE INDEX IF NOT EXISTS stone_categories_category_idx ON stone_categories (category_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stone_categories ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON stone_categories TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_stone_categories" ON stone_categories;
CREATE POLICY "public_read_stone_categories" ON stone_categories FOR SELECT
  TO anon, authenticated USING (true);

INSERT INTO categories (slug, name, tagline, description, cover_image, sort_order) VALUES
('geodes', 'ژئودها و خوشه‌ها', 'غارهای کوچک درون سنگ', 'ژئودها و خوشه‌های بلوری، پنجره‌هایی به دنیای درونی زمین که هر کدام شکلی تازه از رشد بلورها را نشان می‌دهند.', 'https://images.pexels.com/photos/1573233/pexels-photo-1573233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
('rare-finds', 'یافته‌های کمیاب', 'قطعاتی که دوباره پیدا نمی‌شوند', 'سنگ‌هایی با منشأ محدود و ترکیب رنگی نادر که برای کلکسیونرها و علاقه‌مندان به قطعات کم‌نظیر انتخاب شده‌اند.', 'https://images.pexels.com/photos/10545702/pexels-photo-10545702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2),
('blue-treasures', 'گوهرهای آبی', 'آرامش رنگ آسمان در دل سنگ', 'از آبی عمیق لاجورد تا بازتاب‌های درخشان لابرادوریت؛ مجموعه‌ای از سنگ‌های آبی که حس آرامش و عمق را منتقل می‌کنند.', 'https://images.pexels.com/photos/11434879/pexels-photo-11434879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 3),
('green-harmony', 'سبزهای طبیعت', 'سبزهای عمیق؛ از یشم تا مالاکیت', 'طیف گسترده‌ای از سبزها، از حلقه‌های مالاکیت تا یشم صیقلی، برای فضاهایی که به هماهنگی با طبیعت اهمیت می‌دهند.', 'https://images.pexels.com/photos/2894952/pexels-photo-2894952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 4),
('warm-tones', 'گرم‌های آفتابی', 'نارنجی، زرد و قرمز طلایی', 'سنگ‌هایی با درخشش گرم که مانند نور عصر در فضا جاری می‌شوند؛ از عقیق آتشین تا سیترین زرد.', 'https://images.pexels.com/photos/11625766/pexels-photo-11625766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 5),
('minimal-black', 'سیاه‌های مینیمال', 'سادگی سیاه، جلوه‌ای بی‌زمان', 'اونیکس، ابسیدین و مرمر سیاه با خطوط ساده؛ انتخابی برای دکوراسیون مدرن و فضاهای مینیمال.', 'https://images.pexels.com/photos/38178510/pexels-photo-38178510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 6),
('pink-calm', 'صورتی آرام', 'لطافت کوارتز و رودونیت', 'رنگ‌های صورتی ملایم که حس آرامش و لطافت می‌دهند؛ مناسب اتاق خواب، میز مطالعه و فضاهای خصوصی.', 'https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 7)
ON CONFLICT (slug) DO NOTHING;

UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/6806375/pexels-photo-6806375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/39775560/pexels-photo-39775560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-001';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/8926390/pexels-photo-8926390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/6757423/pexels-photo-6757423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/6400515/pexels-photo-6400515.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-002';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/28288786/pexels-photo-28288786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/35647471/pexels-photo-35647471.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-003';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/3737455/pexels-photo-3737455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-004';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/2894952/pexels-photo-2894952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/1571587/malachite-green-mineral-texture-1571587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/29966964/pexels-photo-29966964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-005';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/6614314/pexels-photo-6614314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/11434879/pexels-photo-11434879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-006';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/18325723/pexels-photo-18325723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/9990206/pexels-photo-9990206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/4744788/pexels-photo-4744788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-007';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/34703308/pexels-photo-34703308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/1573233/pexels-photo-1573233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-008';
UPDATE stones SET images = ARRAY['https://images.pexels.com/photos/7347433/pexels-photo-7347433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/4040646/pexels-photo-4040646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/4040645/pexels-photo-4040645.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'] WHERE code = 'GH-009';

INSERT INTO stones (code, name, category, stone_type, color, weight, dimensions, origin, availability, has_certificate, description, images, featured, sort_order) VALUES
('GH-010', 'سیترین زرد', 'precious', 'سیترین', 'زرد طلایی', '1.2 کیلوگرم', '13 × 10 سانتی‌متر', 'برزیل', 'available', true,
 'بلورهای سیترین با رنگ زرد طلایی و شفافیتی که با نور روز می‌درخشد. قطعه‌ای گرم و شاد برای فضاهای روشن.',
 ARRAY['https://images.pexels.com/photos/11625766/pexels-photo-11625766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/11675189/pexels-photo-11675189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 10),
('GH-011', 'لابرادوریت رنگین‌کمانی', 'collectible', 'لابرادوریت', 'خاکستری آبی با بازتاب رنگین‌کمانی', '0.7 کیلوگرم', '10 × 8 سانتی‌متر', 'ماداگاسکار', 'available', true,
 'سطح لابرادوریت با بازی نور آبی و سبز، رنگی که با هر زاویه تغییر می‌کند. یک قطعه کلکسیونی با جلوه‌ای کم‌نظیر.',
 ARRAY['https://images.pexels.com/photos/39429358/pexels-photo-39429358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/39036560/pexels-photo-39036560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/13298909/pexels-photo-13298909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 11),
('GH-012', 'تورمالین سیاه', 'precious', 'تورمالین', 'سیاه براق', '0.5 کیلوگرم', '9 × 7 سانتی‌متر', 'برزیل', 'limited', true,
 'بلورهای تورمالین سیاه با سطح براق و ساختار منظم. انتخابی مناسب برای مجموعه‌های مینیمال و هدیه‌ای کم‌حجم اما ارزشمند.',
 ARRAY['https://images.pexels.com/photos/11796909/pexels-photo-11796909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/6614304/pexels-photo-6614304.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 12),
('GH-013', 'رودونیت صورتی', 'decorative', 'رودونیت', 'صورتی با رگه‌های مشکی', '2.2 کیلوگرم', '15 × 11 سانتی‌متر', 'برزیل', 'available', false,
 'رودونیت با زمینه صورتی و رگه‌های تیره که الگویی هندسی و آرام روی سطح می‌سازد. مناسب دکوراسیون لطیف و آرام.',
 ARRAY['https://images.pexels.com/photos/7828074/pexels-photo-7828074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/10438706/pexels-photo-10438706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 13),
('GH-014', 'ابسیدین مشکی', 'decorative', 'ابسیدین', 'مشکی شیشه‌ای', '1.6 کیلوگرم', '12 × 10 سانتی‌متر', 'مکزیک', 'available', false,
 'سنگ آتشفشانی ابسیدین با سطحی شیشه‌ای و براق. فرمی خام و طبیعی که به فضای مدرن شخصیت می‌دهد.',
 ARRAY['https://images.pexels.com/photos/38178511/pexels-photo-38178511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/38178676/pexels-photo-38178676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/38178512/pexels-photo-38178512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 14),
('GH-015', 'وانادینیت قرمز', 'collectible', 'وانادینیت', 'قرمز آتشین', '0.2 کیلوگرم', '5 × 4 سانتی‌متر', 'مراکش', 'limited', true,
 'بلورهای قرمز وانادینیت روی پایه‌ای تیره؛ نمونه‌ای کمیاب و کوچک برای کلکسیونرهایی که به جزئیات اهمیت می‌دهند.',
 ARRAY['https://images.pexels.com/photos/10545702/pexels-photo-10545702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/33203193/pexels-photo-33203193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 15)
ON CONFLICT (code) DO NOTHING;

INSERT INTO stone_categories (stone_id, category_id)
SELECT s.id, c.id
FROM (VALUES
  ('GH-001', 'warm-tones'),
  ('GH-002', 'geodes'),
  ('GH-002', 'rare-finds'),
  ('GH-003', 'minimal-black'),
  ('GH-004', 'pink-calm'),
  ('GH-005', 'green-harmony'),
  ('GH-006', 'blue-treasures'),
  ('GH-006', 'rare-finds'),
  ('GH-007', 'minimal-black'),
  ('GH-008', 'geodes'),
  ('GH-009', 'green-harmony'),
  ('GH-010', 'warm-tones'),
  ('GH-011', 'blue-treasures'),
  ('GH-011', 'rare-finds'),
  ('GH-012', 'minimal-black'),
  ('GH-012', 'rare-finds'),
  ('GH-013', 'pink-calm'),
  ('GH-014', 'minimal-black'),
  ('GH-015', 'warm-tones'),
  ('GH-015', 'rare-finds')
) AS links(stone_code, category_slug)
JOIN stones s ON s.code = links.stone_code
JOIN categories c ON c.slug = links.category_slug
ON CONFLICT (stone_id, category_id) DO NOTHING;
