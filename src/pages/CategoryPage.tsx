import { ArrowLeft } from 'lucide-react';
import CollectionPills from '@/components/CollectionPills';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCollectionStones, getNeighbourCollections } from '@/lib/catalog';
import { fetchCatalog } from '@/lib/stones';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/styles';

interface CategoryPageProps {
  slug: string;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const { state, retry } = useAsyncData(fetchCatalog, []);

  if (state.status === 'loading') {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8" aria-busy="true">
        <div className="h-96 animate-pulse rounded-3xl bg-charcoal-800" />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <StatusPanel title="بارگذاری این دسته انجام نشد" description="اتصال برقرار نشد. لطفاً دوباره تلاش کنید.">
          <button type="button" onClick={retry} className={BUTTON_SECONDARY}>
            تلاش دوباره
          </button>
        </StatusPanel>
      </div>
    );
  }

  const collection = state.data.collections.find((item) => item.slug === slug);
  if (!collection) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <StatusPanel title="این دسته پیدا نشد" description="ممکن است نشانی اشتباه باشد یا این دسته دیگر فعال نباشد.">
          <a href="#/gallery" className={BUTTON_PRIMARY}>
            مشاهده گالری
          </a>
        </StatusPanel>
      </div>
    );
  }

  const stones = getCollectionStones(collection, state.data.stones);
  const neighbours = getNeighbourCollections([collection.id], stones);

  return (
    <div>
      <section className="relative isolate flex min-h-[460px] items-end overflow-hidden border-b border-charcoal-800">
        {collection.cover_image && (
          <img src={collection.cover_image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover animate-fade-in" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/75 to-charcoal-950/35" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8">
          <a href="#/gallery" className="mb-8 inline-flex items-center gap-2 text-sm text-bronze-300 transition hover:text-bronze-200">
            بازگشت به گالری
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="animate-fade-up text-sm text-bronze-300">{collection.tagline}</p>
          <h1 className="animate-fade-up mt-3 text-5xl sm:text-6xl" style={{ animationDelay: '120ms' }}>
            {collection.name}
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-base leading-[1.5] text-cream-100" style={{ animationDelay: '240ms' }}>
            {collection.description}
          </p>
          <p className="animate-fade-up mt-6 text-sm text-bronze-300" style={{ animationDelay: '360ms' }}>
            {stones.length} قطعه در این دسته
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {stones.length === 0 ? (
          <StatusPanel
            title="هنوز قطعه‌ای در این دسته نیست"
            description="به‌زودی قطعات تازه به این دسته اضافه می‌شوند. در همین فاصله می‌توانید کل گالری را ببینید."
          >
            <a href="#/gallery" className={BUTTON_SECONDARY}>
              مشاهده گالری
            </a>
          </StatusPanel>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stones.map((stone, index) => (
              <StoneCard key={stone.id} stone={stone} index={index} />
            ))}
          </div>
        )}
      </section>

      {neighbours.length > 0 && (
        <section className="border-t border-charcoal-800 bg-charcoal-900/40">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-bronze-300">دسته‌بندی‌های مرتبط</p>
              <h2 className="text-2xl sm:text-3xl">ادامه گشت‌وگذار</h2>
            </div>
            <CollectionPills collections={neighbours} />
          </div>
        </section>
      )}
    </div>
  );
}
