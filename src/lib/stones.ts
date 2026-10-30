import type { Catalog } from '@/types/stone';

// The collection is intentionally local. Add verified pieces to `stones` when
// real photographs and descriptions are available; the covers are illustrative.
const catalog: Catalog = {
  collections: [
    { id: 'gemstones', slug: 'gemstones', name: 'سنگ‌های قیمتی', tagline: 'درخشش در جزئیات', description: 'نگاهی نزدیک به دنیای گوهرها، رنگ‌های عمیق و ظرافت سنگ‌های طبیعی.', cover_image: `${import.meta.env.BASE_URL}images/gemstones.jpg`, sort_order: 1 },
    { id: 'crystals', slug: 'crystals', name: 'بلورها و کانی‌ها', tagline: 'شکل‌هایی از دل زمین', description: 'مجموعه‌ای برای شناخت فرم‌های طبیعی، ساختار بلوری و زیبایی کانی‌ها.', cover_image: `${import.meta.env.BASE_URL}images/gallery-hero.jpg`, sort_order: 2 },
    { id: 'geodes', slug: 'geodes', name: 'ژئود و برش سنگ', tagline: 'جهانی پنهان در درون سنگ', description: 'از لایه‌های عقیق تا حفره‌های بلورین؛ تماشای شگفتی‌هایی که درون سنگ پنهان‌اند.', cover_image: `${import.meta.env.BASE_URL}images/geodes.jpg`, sort_order: 3 },
    { id: 'decorative', slug: 'decorative-stones', name: 'سنگ‌های دکوراتیو', tagline: 'طبیعت در فضای زندگی', description: 'فرم‌ها و بافت‌های طبیعی در قطعاتی برای فضاهای شخصی و دکوراتیو.', cover_image: `${import.meta.env.BASE_URL}images/decorative.jpg`, sort_order: 4 },
  ],
  stones: [],
};

export async function fetchCatalog(): Promise<Catalog> {
  return catalog;
}
