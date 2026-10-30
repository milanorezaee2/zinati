import { useState } from 'react';
import { ChevronDown, ChevronLeft, Grid2X2, Layers3 } from 'lucide-react';
import { useAsyncData } from '@/hooks/useAsyncData';
import { fetchCatalog } from '@/lib/stones';

export default function CategorySidebar({ activeSlug, isGallery }: { activeSlug?: string; isGallery: boolean }) {
  const { state, retry } = useAsyncData(fetchCatalog, []);
  const [open, setOpen] = useState(false);

  return (
    <aside className="px-5 pt-6 sm:px-8 lg:px-0 lg:pt-0" aria-label="دسته‌بندی‌های گالری">
      <div className="rounded-[1.5rem] border border-charcoal-700 bg-white p-4 shadow-[0_10px_35px_rgba(25,60,45,0.05)] lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:p-5">
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="category-sidebar-navigation" className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-right lg:hidden">
          <span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f1e9] text-bronze-300"><Layers3 size={19} aria-hidden="true" /></span><span><span className="block text-sm font-semibold text-cream-50">دسته‌بندی گالری</span><span className="mt-1 block text-xs text-charcoal-200">انتخاب مسیر تماشا</span></span></span>
          <ChevronDown size={19} aria-hidden="true" className={`text-bronze-300 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className="hidden items-center gap-3 px-2 pb-5 pt-2 lg:flex"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f1e9] text-bronze-300"><Layers3 size={20} aria-hidden="true" /></span><div><p className="text-sm font-semibold text-cream-50">دسته‌بندی گالری</p><p className="mt-1 text-xs text-charcoal-200">مسیر خود را انتخاب کنید</p></div></div>
        <nav id="category-sidebar-navigation" aria-label="دسته‌های سنگ" className={`${open ? 'block' : 'hidden'} mt-3 border-t border-charcoal-700 pt-3 lg:mt-0 lg:block`}>
          <a href="#/gallery" onClick={() => setOpen(false)} aria-current={isGallery && !activeSlug ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isGallery && !activeSlug ? 'bg-[#e5f1e9] font-semibold text-bronze-300' : 'text-cream-100 hover:bg-charcoal-800'}`}><Grid2X2 size={17} aria-hidden="true" /> همه مجموعه‌ها</a>
          {state.status === 'loading' && <p className="px-3 py-4 text-xs text-charcoal-200" aria-live="polite">در حال آماده‌سازی دسته‌ها...</p>}
          {state.status === 'error' && <div className="px-3 py-3 text-xs leading-6 text-charcoal-200"><p>دسته‌ها بارگذاری نشدند.</p><button type="button" onClick={retry} className="mt-2 text-bronze-300 underline">تلاش دوباره</button></div>}
          {state.status === 'ready' && <ul className="mt-1 space-y-1">{state.data.collections.map((collection) => {
            const active = collection.slug === activeSlug;
            return <li key={collection.id}><a href={`#/category/${collection.slug}`} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${active ? 'bg-[#e5f1e9] text-bronze-300' : 'text-cream-100 hover:bg-charcoal-800'}`}><span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? 'bg-bronze-400' : 'bg-charcoal-500'}`} /><span className="min-w-0 flex-1 text-sm leading-6">{collection.name}</span><ChevronLeft size={16} aria-hidden="true" className={`shrink-0 transition ${active ? 'text-bronze-300' : 'text-charcoal-400 group-hover:text-bronze-300'}`} /></a></li>;
          })}</ul>}
        </nav>
        <p className="hidden px-3 pt-5 text-xs leading-7 text-charcoal-300 lg:block">در هر مجموعه، از دریچه‌ای تازه به دنیای سنگ‌ها نگاه کنید.</p>
      </div>
    </aside>
  );
}
