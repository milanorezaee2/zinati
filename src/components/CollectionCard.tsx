import { ArrowUpRight } from 'lucide-react';
import type { StoneCollection } from '@/types/stone';

interface CollectionCardProps {
  collection: StoneCollection;
  count: number;
  wide?: boolean;
  index?: number;
}

export default function CollectionCard({ collection, count, wide = false, index = 0 }: CollectionCardProps) {
  return (
    <a
      href={`#/category/${collection.slug}`}
      className={`group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-ink-300/50 bg-ivory-200 p-8 transition duration-700 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-2xl hover:shadow-ink-900/15 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
        wide ? 'md:col-span-2' : ''
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 90}ms` }}
    >
      {collection.cover_image && (
        <img
          src={collection.cover_image}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.05]"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent" />

      <div className="flex flex-col gap-2 text-ivory-50">
        <span className="text-xs font-medium uppercase tracking-luxe text-gold-200">{count} قطعه</span>
        <h3 className="text-2xl font-bold">{collection.name}</h3>
        <p className="text-sm text-ivory-200/90">{collection.tagline}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-200 transition group-hover:text-gold-200">
        ورود به دسته
        <ArrowUpRight className="h-4 w-4 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}
