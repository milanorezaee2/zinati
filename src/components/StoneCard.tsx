import { ArrowLeft, Gem } from 'lucide-react';
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
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-charcoal-700 bg-charcoal-900 transition duration-500 hover:-translate-y-1 hover:border-bronze-600 hover:shadow-2xl hover:shadow-emerald-950/10 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-300"
      style={{ animationDelay: `${Math.min(index, 8) * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5] bg-charcoal-800">
        {cover ? (
          <img
            src={cover}
            alt={stone.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-bronze-500/60">
            <Gem className="h-12 w-12" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#091923]/70 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="text-bronze-300">{CATEGORY_LABELS[stone.category]}</span>
          <span dir="ltr" className="text-charcoal-200">
            {stone.code}
          </span>
        </div>
        <h3 className="text-xl font-semibold leading-9 text-cream-50">{stone.name}</h3>
        <p className="text-sm text-charcoal-200">{stone.color}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-bronze-400 transition group-hover:text-bronze-300">
          مشاهده جزئیات
          <ArrowLeft className="h-4 w-4 transition duration-300 group-hover:-translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
