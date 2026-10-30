import { Search } from 'lucide-react';
import { AVAILABILITY_LABELS, CATEGORY_LABELS } from '@/lib/stoneLabels';
import { INPUT_BASE, INPUT_IDLE } from '@/lib/styles';
import { STONE_AVAILABILITIES, STONE_CATEGORIES, type StoneAvailability, type StoneCategory, type StoneCollection } from '@/types/stone';
import type { ReactNode } from 'react';

export type CategoryFilterValue = 'all' | StoneCategory;
export type AvailabilityFilterValue = 'all' | StoneAvailability;

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  typeCounts: Record<CategoryFilterValue, number>;
  collection: string;
  onCollectionChange: (slug: string) => void;
  collections: StoneCollection[];
  collectionCounts: Record<string, number>;
  availability: AvailabilityFilterValue;
  onAvailabilityChange: (value: AvailabilityFilterValue) => void;
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-300 ${
        active
          ? 'border-bronze-400 bg-bronze-400 font-bold text-charcoal-950'
          : 'border-charcoal-600 text-cream-200 hover:border-bronze-500 hover:text-bronze-300'
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-charcoal-200">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  typeCounts,
  collection,
  onCollectionChange,
  collections,
  collectionCounts,
  availability,
  onAvailabilityChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-charcoal-700 bg-charcoal-900/60 p-5 sm:p-6">
      <label className="relative block">
        <span className="sr-only">جست‌وجو در سنگ‌ها</span>
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="جست‌وجوی نام، رنگ یا کد سنگ"
          className={`${INPUT_BASE} ${INPUT_IDLE} ps-11`}
        />
      </label>

      <FilterGroup label="نوع سنگ">
        <FilterChip active={category === 'all'} onClick={() => onCategoryChange('all')}>
          همه ({typeCounts.all})
        </FilterChip>
        {STONE_CATEGORIES.map((value) => (
          <FilterChip key={value} active={category === value} onClick={() => onCategoryChange(value)}>
            {CATEGORY_LABELS[value]} ({typeCounts[value]})
          </FilterChip>
        ))}
      </FilterGroup>

      <FilterGroup label="دسته‌بندی‌ها">
        <FilterChip active={collection === 'all'} onClick={() => onCollectionChange('all')}>
          همه مجموعه‌ها ({collectionCounts.all})
        </FilterChip>
        {collections.map((item) => (
          <FilterChip key={item.id} active={collection === item.slug} onClick={() => onCollectionChange(item.slug)}>
            {item.name} ({collectionCounts[item.slug] ?? 0})
          </FilterChip>
        ))}
      </FilterGroup>

      <FilterGroup label="وضعیت موجودی">
        <FilterChip active={availability === 'all'} onClick={() => onAvailabilityChange('all')}>
          همه وضعیت‌ها
        </FilterChip>
        {STONE_AVAILABILITIES.map((value) => (
          <FilterChip key={value} active={availability === value} onClick={() => onAvailabilityChange(value)}>
            {AVAILABILITY_LABELS[value]}
          </FilterChip>
        ))}
      </FilterGroup>
    </div>
  );
}
