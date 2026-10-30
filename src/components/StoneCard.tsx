import { ArrowUpRight } from 'lucide-react';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import { CATEGORY_LABELS } from '@/lib/stoneLabels';
import type { Stone } from '@/types/stone';

interface StoneCardProps {
  stone: Stone;
  index?: number;
}

export default function StoneCard({ stone, index = 0 }: StoneCardProps) {
  const cover = stone.images[0];

  return (
    <a
      href={`#/stone/${stone.code}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-300/50 bg-ivory-100 transition duration-700 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-2xl hover:shadow-ink-900/10 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      style={{ animationDelay: `${Math.min(index, 8) * 90}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
        {cover ? (
          <img
            src={cover}
            alt={stone.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gold-300">
            <span className="text-3xl font-bold">گ</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute start-3 top-3">
          <AvailabilityBadge availability={stone.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-medium uppercase tracking-wider text-gold-600">{CATEGORY_LABELS[stone.category]}</span>
          <span dir="ltr" className="text-ink-400">
            {stone.code}
          </span>
        </div>
        <h3 className="text-xl text-ink-900">{stone.name}</h3>
        <p className="text-sm text-ink-400">{stone.color}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-ink-700 transition duration-500 group-hover:text-gold-600">
          مشاهده جزئیات
          <ArrowUpRight className="h-4 w-4 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
