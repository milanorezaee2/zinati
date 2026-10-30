import { ArrowLeft } from 'lucide-react';
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
      className={`group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-charcoal-700 bg-charcoal-900 p-7 transition duration-500 hover:-translate-y-1 hover:border-bronze-500 hover:shadow-2xl hover:shadow-black/60 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-300 ${
        wide ? 'md:col-span-2' : ''
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 80}ms` }}
    >
      {collection.cover_image && (
        <img
          src={collection.cover_image}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/10" />

      <div className="flex flex-col gap-2">
        <span className="text-xs text-bronze-300">{count} قطعه</span>
        <h3 className="text-2xl text-cream-50">{collection.name}</h3>
        <p className="text-sm text-cream-100">{collection.tagline}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm text-bronze-300 transition group-hover:text-bronze-200">
        ورود به دسته
        <ArrowLeft className="h-4 w-4 transition duration-300 group-hover:-translate-x-1" aria-hidden="true" />
      </span>
    </a>
  );
}
