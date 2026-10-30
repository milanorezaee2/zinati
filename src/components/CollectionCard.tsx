import { ArrowLeft } from 'lucide-react';
import type { StoneCollection } from '@/types/stone';

interface CollectionCardProps {
  collection: StoneCollection;
  index?: number;
  variant?: 'editorial' | 'overlay';
}

export default function CollectionCard({ collection, index, variant = 'editorial' }: CollectionCardProps) {
  const number = index === undefined ? null : new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(index + 1);
  if (variant === 'overlay') {
    return (
      <a href={`#/category/${collection.slug}`} className="group relative isolate flex aspect-[4/3] min-w-0 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 p-6 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-bronze-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze-300 sm:aspect-[4/5]">
        {collection.cover_image && <img src={collection.cover_image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
        <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#091923] via-[#091923]/40 to-[#091923]/30" />
        {number && <span className="w-fit rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs text-white">{number}</span>}
        <span className="mt-auto block"><span className="block text-xs font-medium text-[#b9ecd9]">{collection.tagline}</span><span className="mt-3 block text-xl font-semibold leading-9 text-white">{collection.name}</span><span className="mt-4 inline-flex items-center gap-2 text-sm text-white/90">مشاهده مجموعه <ArrowLeft size={16} aria-hidden="true" className="transition group-hover:-translate-x-1" /></span></span>
      </a>
    );
  }
  return (
    <a href={`#/category/${collection.slug}`} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-charcoal-700 bg-charcoal-900 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-bronze-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-800 sm:aspect-[4/5]">
        {collection.cover_image && <img src={collection.cover_image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091923]/70 via-transparent to-transparent" />
        {number && <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-xs text-white">{number}</span>}
        <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white transition group-hover:bg-bronze-400 group-hover:text-white"><ArrowLeft size={17} aria-hidden="true" /></span>
      </div>
      <div className="flex flex-1 flex-col items-start p-5 sm:p-6"><p className="text-xs font-medium text-bronze-300">{collection.tagline}</p><h3 className="mt-3 text-xl font-semibold leading-9 text-cream-50">{collection.name}</h3><p className="mt-2 text-sm leading-8 text-charcoal-200">{collection.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-bronze-300">آشنایی با این دسته <ArrowLeft size={15} aria-hidden="true" /></span></div>
    </a>
  );
}
