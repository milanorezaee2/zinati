import { useMemo, useState } from 'react';
import FilterBar, { type AvailabilityFilterValue, type CategoryFilterValue } from '@/components/FilterBar';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCollectionStones } from '@/lib/catalog';
import { fetchCatalog } from '@/lib/stones';
import { BUTTON_SECONDARY } from '@/lib/styles';
import { STONE_CATEGORIES, type Stone, type StoneCollection } from '@/types/stone';

interface GalleryPageProps {
  initialCategory: string | null;
  initialCollection: string | null;
}

function parseCategory(value: string | null): CategoryFilterValue {
  return STONE_CATEGORIES.find((category) => category === value) ?? 'all';
}

function matchesQuery(stone: Stone, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return [stone.name, stone.color, stone.stone_type, stone.code].some((field) =>
    field.toLowerCase().includes(normalizedQuery),
  );
}

function GallerySkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="aspect-[4/5] animate-pulse rounded-2xl bg-charcoal-800" />
      ))}
    </div>
  );
}

export default function GalleryPage({ initialCategory, initialCollection }: GalleryPageProps) {
  const { state, retry } = useAsyncData(fetchCatalog, []);
  const [category, setCategory] = useState<CategoryFilterValue>(() => parseCategory(initialCategory));
  const [collection, setCollection] = useState(initialCollection ?? 'all');
  const [availability, setAvailability] = useState<AvailabilityFilterValue>('all');
  const [query, setQuery] = useState('');

  const stones = useMemo(() => (state.status === 'ready' ? state.data.stones : []), [state]);
  const collections = useMemo(() => (state.status === 'ready' ? state.data.collections : []), [state]);

  const typeCounts = useMemo(() => {
    const result: Record<CategoryFilterValue, number> = { all: stones.length, precious: 0, decorative: 0, collectible: 0 };
    stones.forEach((stone) => {
      result[stone.category] += 1;
    });
    return result;
  }, [stones]);

  const collectionCounts = useMemo(() => {
    const result: Record<string, number> = { all: stones.length };
    collections.forEach((item: StoneCollection) => {
      result[item.slug] = getCollectionStones(item, stones).length;
    });
    return result;
  }, [stones, collections]);

  const visibleStones = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stones.filter(
      (stone) =>
        (category === 'all' || stone.category === category) &&
        (collection === 'all' || stone.collections.some((item) => item.slug === collection)) &&
        (availability === 'all' || stone.availability === availability) &&
        matchesQuery(stone, normalizedQuery),
    );
  }, [stones, category, collection, availability, query]);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setCollection('all');
    setAvailability('all');
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-12 flex max-w-2xl flex-col gap-4">
        <p className="text-sm text-bronze-300">گالری</p>
        <h1 className="text-4xl sm:text-5xl">مجموعه سنگ‌ها</h1>
        <p className="text-sm leading-[1.5] text-charcoal-100 sm:text-base">
          هر قطعه را با رنگ، بافت و منشأ آن بشناسید و برای استعلام، صفحه اختصاصی‌اش را باز کنید.
        </p>
      </div>

      <div className="mb-12">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          typeCounts={typeCounts}
          collection={collection}
          onCollectionChange={setCollection}
          collections={collections}
          collectionCounts={collectionCounts}
          availability={availability}
          onAvailabilityChange={setAvailability}
        />
      </div>

      {state.status === 'loading' && <GallerySkeleton />}

      {state.status === 'error' && (
        <StatusPanel title="بارگذاری گالری انجام نشد" description="اتصال برقرار نشد. لطفاً دوباره تلاش کنید.">
          <button type="button" onClick={retry} className={BUTTON_SECONDARY}>
            تلاش دوباره
          </button>
        </StatusPanel>
      )}

      {state.status === 'ready' && visibleStones.length === 0 && (
        <StatusPanel
          title="سنگی با این فیلترها پیدا نشد"
          description="فیلترها یا عبارت جست‌وجو را تغییر دهید تا قطعات بیشتری را ببینید."
        >
          <button type="button" onClick={resetFilters} className={BUTTON_SECONDARY}>
            پاک کردن فیلترها
          </button>
        </StatusPanel>
      )}

      {state.status === 'ready' && visibleStones.length > 0 && (
        <>
          <p className="mb-6 text-sm text-charcoal-200" aria-live="polite">
            {visibleStones.length} قطعه نمایش داده می‌شود
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStones.map((stone, index) => (
              <StoneCard key={stone.id} stone={stone} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
