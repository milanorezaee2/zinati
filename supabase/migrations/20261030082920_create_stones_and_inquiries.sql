/*
# Create stone gallery tables

1. New Tables
- `stones`: the gallery catalogue. Each row is one stone piece with its code, name, category (precious, decorative, collectible), type, color, weight, dimensions, origin, availability (available, limited, sold), certificate flag, description, photo URLs, featured flag and display order.
- `inquiries`: enquiries submitted from a stone page or the contact form. Stores the visitor name, phone, optional message and the stone they asked about.

2. Security
- RLS enabled on both tables.
- `stones`: anyone (anon and signed-in roles) may read rows. No write policies, so catalogue changes are made only by the database owner for now.
- `inquiries`: anyone may insert a new enquiry, with length checks on each field. Nobody may read enquiries through the public API, so visitor data stays private.

3. Seed data
- Eight sample stones inserted with fixed codes. Re-running is safe because existing codes are skipped.

4. Notes
- Sample names, origins and photos are placeholders and must be replaced with the real collection before public use.
*/

CREATE TABLE IF NOT EXISTS stones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('precious', 'decorative', 'collectible')),
  stone_type text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT '',
  weight text,
  dimensions text,
  origin text,
  availability text NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'limited', 'sold')),
  has_certificate boolean NOT NULL DEFAULT false,
  description text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS stones_category_idx ON stones (category);
CREATE INDEX IF NOT EXISTS stones_sort_idx ON stones (sort_order);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stone_id uuid REFERENCES stones(id) ON DELETE SET NULL,
  stone_code text,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_stone_id_idx ON inquiries (stone_id);

ALTER TABLE stones ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON stones TO anon, authenticated;
GRANT INSERT ON inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_stones" ON stones;
CREATE POLICY "public_read_stones" ON stones FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_inquiries" ON inquiries;
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

INSERT INTO stones (code, name, category, stone_type, color, weight, dimensions, origin, availability, has_certificate, description, images, featured, sort_order) VALUES
('GH-001', 'عقیق آتشین', 'precious', 'عقیق', 'نارنجی و قرمز', '1.8 کیلوگرم', '14 × 9 سانتی‌متر', 'برزیل', 'available', true,
 'برشی از عقیق آتشین با لایه‌های نرم و درخشش گرم. الگوی طبیعی سنگ در هر زاویه تازه به نظر می‌رسد و برای قرار گرفتن کنار نور طراحی‌شده مناسب است.',
 ARRAY['https://images.pexels.com/photos/6806375/pexels-photo-6806375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/39775560/pexels-photo-39775560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 1),
('GH-002', 'آمتیست بلورین', 'precious', 'آمتیست', 'بنفش عمیق', '3.2 کیلوگرم', '18 × 12 سانتی‌متر', 'اوروگوئه', 'limited', true,
 'خوشه‌ای از بلورهای آمتیست با رنگ بنفش یکدست و سطح شفاف. ساختار بلوری سنگ، نمایی از طبیعت در دل زمین ارائه می‌دهد.',
 ARRAY['https://images.pexels.com/photos/8926390/pexels-photo-8926390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/6757423/pexels-photo-6757423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 2),
('GH-003', 'اونیکس مشکی', 'decorative', 'اونیکس', 'مشکی با رگه‌های سفید', '2.4 کیلوگرم', '30 × 20 سانتی‌متر', 'ایران', 'available', false,
 'صفحه‌ای از اونیکس مشکی با رگه‌های ظریف سفید. مناسب برای میز، پیشخوان یا دیوار تزئینی با حس مدرن و مینیمال.',
 ARRAY['https://images.pexels.com/photos/28288786/pexels-photo-28288786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/35647471/pexels-photo-35647471.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 3),
('GH-004', 'کوارتز گلی', 'decorative', 'کوارتز', 'صورتی ملایم', '1.1 کیلوگرم', '12 × 10 سانتی‌متر', 'ماداگاسکار', 'available', false,
 'بلورهای کوارتز گلی با رنگی لطیف و شفافیت نرم. گزینه‌ای آرام برای اتاق خواب، میز مطالعه یا فضای آرامش.',
 ARRAY['https://images.pexels.com/photos/3737455/pexels-photo-3737455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/13041021/pexels-photo-13041021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 4),
('GH-005', 'مالاکیت سبز', 'decorative', 'مالاکیت', 'سبز پررنگ با الگوی حلقوی', '2.9 کیلوگرم', '16 × 11 سانتی‌متر', 'کنگو', 'limited', true,
 'سنگی با الگوهای حلقوی سبز که هر قطعه را منحصربه‌فرد می‌کند. برای تزئین میز، قفسه یا به عنوان یک اثر کلکسیونی انتخاب مناسبی است.',
 ARRAY['https://images.pexels.com/photos/2894952/pexels-photo-2894952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/1571587/malachite-green-mineral-texture-1571587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 5),
('GH-006', 'لاجورد آبی', 'collectible', 'لاجورد', 'آبی سرمه‌ای با خال‌های طلایی', '0.9 کیلوگرم', '9 × 7 سانتی‌متر', 'افغانستان', 'available', true,
 'تکه‌ای از لاجورد با رنگ آبی عمیق و ذرات پیریت طلایی. یکی از قدیمی‌ترین سنگ‌های زینتی که در گنجینه‌های کلکسیونرها جایگاه ویژه دارد.',
 ARRAY['https://images.pexels.com/photos/6614314/pexels-photo-6614314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/11434879/pexels-photo-11434879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 6),
('GH-007', 'مرمر سیاه ونزوئلا', 'decorative', 'مرمر', 'سیاه با رگه‌های نقره‌ای', '4.5 کیلوگرم', '60 × 40 سانتی‌متر', 'ونزوئلا', 'sold', false,
 'سنگ مرمر سیاه با رگه‌های نقره‌ای و حرکت طبیعی. این قطعه فروخته شده، اما برای سفارش مشابه می‌توانید استعلام بگیرید.',
 ARRAY['https://images.pexels.com/photos/18325723/pexels-photo-18325723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/9990206/pexels-photo-9990206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 7),
('GH-008', 'ژئود آمتیست', 'collectible', 'ژئود', 'بنفش و سفید', '5.6 کیلوگرم', '22 × 18 سانتی‌متر', 'برزیل', 'available', true,
 'ژئودی که با بلورهای آمتیست درونش، نمایی از یک غار پنهان را به نمایش می‌گذارد. قطعه‌ای نمایشی برای گالری‌ها و مجموعه‌های خصوصی.',
 ARRAY['https://images.pexels.com/photos/34703308/pexels-photo-34703308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], true, 8),
('GH-009', 'یشم سبز کنده‌کاری‌شده', 'precious', 'یشم', 'سبز زمردی', '0.4 کیلوگرم', '8 × 6 سانتی‌متر', 'چین', 'available', true,
 'قطعه‌ای از یشم سبز زمردی با سطح صیقلی و حجم سبک. مناسب برای هدیه‌ای اصیل و ماندگار.',
 ARRAY['https://images.pexels.com/photos/7347433/pexels-photo-7347433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'], false, 9)
ON CONFLICT (code) DO NOTHING;
