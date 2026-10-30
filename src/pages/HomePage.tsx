import { ArrowLeft } from 'lucide-react';
import CollectionCard from '@/components/CollectionCard';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCollectionStones } from '@/lib/catalog';
import { fetchCatalog } from '@/lib/stones';
import { SITE_CONFIG } from '@/lib/siteConfig';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, EYEBROW } from '@/lib/styles';
import type { Catalog, Stone } from '@/types/stone';

const HERO_IMAGE = 'https://images.pexels.com/photos/6757423/pexels-photo-6757423.jpeg?auto=compress&cs=tinysrgb&w=1920';

function FeaturedSection({ stones }: { stones: Stone[] }) {
  const featured = stones.filter((stone) => stone.featured).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className={EYEBROW}>قطعات منتخب</p>
          <h2 className="text-3xl sm:text-4xl">چند اثر، از میان مجموعه</h2>
        </div>
        <a href="#/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition hover:text-gold-600">
          مشاهده همه سنگ‌ها
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((stone, index) => (
          <StoneCard key={stone.id} stone={stone} index={index} />
        ))}
      </div>
    </section>
  );
}

function CollectionsSection({ catalog }: { catalog: Catalog }) {
  if (catalog.collections.length === 0) return null;
  const lastIndex = catalog.collections.length - 1;

  return (
    <section className="border-y border-ink-300/40 bg-ivory-100">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 flex max-w-2xl flex-col gap-4">
          <p className={EYEBROW}>دسته‌بندی‌ها</p>
          <h2 className="text-3xl sm:text-4xl">هر دسته، حال‌وهوایی متفاوت دارد</h2>
          <p className="text-sm leading-[1.7] text-ink-500 sm:text-base">
            از رنگ‌های آفتابی تا سیاهی مینیمال؛ هر مجموعه را جدا بررسی کنید و قطعه‌ای را پیدا کنید که با فضای شما هم‌نوا باشد.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalog.collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              count={getCollectionStones(collection, catalog.stones).length}
              wide={index === 0 || index === lastIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { state, retry } = useAsyncData(fetchCatalog, []);

  return (
    <div>
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover animate-fade-in" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-ivory-50 via-ivory-50/88 to-ivory-50/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ivory-50 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          <div className="flex max-w-2xl flex-col gap-9">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-luxe text-gold-600" style={{ animationDelay: '100ms' }}>
              گالری سنگ‌های زینتی و کلکسیونی
            </p>
            <h1 className="animate-fade-up text-5xl leading-[1.15] text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: '250ms' }}>
              {SITE_CONFIG.slogan}
            </h1>
            <p className="animate-fade-up max-w-xl text-base leading-[1.7] text-ink-500 sm:text-lg" style={{ animationDelay: '400ms' }}>
              مجموعه‌ای از سنگ‌های قیمتی، دکوراتیو و کلکسیونی؛ هر قطعه با بافت، رنگ و منشأ مشخص، برای کسانی که به اصالت و زیبایی طبیعی اهمیت می‌دهند.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: '550ms' }}>
              <a href="#/gallery" className={BUTTON_PRIMARY}>
                ورود به گالری
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#/contact" className={BUTTON_SECONDARY}>
                استعلام و مشاوره
              </a>
            </div>
          </div>
        </div>
      </section>

      {state.status === 'loading' && (
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-24 sm:px-8 sm:py-32 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2].map((item) => (
            <div key={item} className="aspect-[4/5] animate-pulse rounded-2xl bg-ivory-200" />
          ))}
        </div>
      )}

      {state.status === 'error' && (
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <StatusPanel title="بارگذاری قطعات انجام نشد" description="اتصال برقرار نشد. لطفاً دوباره تلاش کنید.">
            <button type="button" onClick={retry} className={BUTTON_SECONDARY}>
              تلاش دوباره
            </button>
          </StatusPanel>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <FeaturedSection stones={state.data.stones} />
          <CollectionsSection catalog={state.data} />
        </>
      )}

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-ink-300/50 bg-ivory-100 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl">دنبال قطعه‌ای خاص هستید؟</h2>
            <p className="text-sm leading-[1.7] text-ink-500 sm:text-base">
              از طریق فرم، واتساپ یا تماس تلفنی استعلام بگیرید و کارشناسان ما برای انتخاب و هماهنگی با شما در تماس خواهند بود.
            </p>
          </div>
          <a href="#/contact" className={BUTTON_PRIMARY}>
            تماس با گالری
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
