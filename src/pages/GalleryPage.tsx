import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import CollectionCard from '@/components/CollectionCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { fetchCatalog } from '@/lib/stones';
import { BUTTON_SECONDARY } from '@/lib/styles';
import { STONE_CATEGORIES, type StoneCategory } from '@/types/stone';

interface GalleryPageProps {
  initialCategory: string | null;
  initialCollection: string | null;
}

export default function GalleryPage({ initialCategory, initialCollection }: GalleryPageProps) {
  const { state, retry } = useAsyncData(fetchCatalog, []);
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState(initialCollection ?? 'all');
  const [category] = useState<StoneCategory | 'all'>(() => STONE_CATEGORIES.find((item) => item === initialCategory) ?? 'all');
  const stones = useMemo(() => state.status === 'ready' ? state.data.stones : [], [state]);
  const visible = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('fa');
    return stones.filter((stone) => (category === 'all' || stone.category === category)
      && (collection === 'all' || stone.collections.some((item) => item.slug === collection))
      && (!search || [stone.name, stone.code, stone.color, stone.stone_type].some((value) => value.toLocaleLowerCase('fa').includes(search))));
  }, [stones, category, collection, query]);

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-[#d9e5dc]">
        <img src={`${import.meta.env.BASE_URL}images/gallery-hero.jpg`} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#091b24] via-[#091b24]/90 to-[#091b24]/40" />
        <div className="mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-center px-6 py-20 sm:px-12 lg:min-h-[520px] lg:px-20">
          <p className="section-kicker section-kicker-light"><span /> دنیایی برای تماشا</p>
          <h1 className="mt-6 text-4xl font-normal leading-[1.7] text-white sm:text-6xl">گالری <span className="text-[#b9ecd9]">سنگ‌ها</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-[2.7] text-white/90 sm:text-base">از درخشش گوهرها تا بافت‌های پنهان در دل سنگ؛ سفری آرام در جهان رنگ‌ها، فرم‌ها و شگفتی‌های طبیعت.</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href="#/" className="border-b border-bronze-500 pb-3 text-sm text-white transition hover:text-[#b9ecd9]">صفحه اصلی</a><span className="text-charcoal-300">/</span><span className="text-sm text-[#b9ecd9]">گالری</span></div>
        </div>
      </section>

      <section aria-labelledby="gallery-collections" className="bg-[#f0f4ed] px-6 py-24 sm:px-12 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end"><div><p className="section-kicker"><span /> مجموعه‌های گالری</p><h2 id="gallery-collections" className="mt-5 text-3xl font-normal leading-[1.7] sm:text-4xl">از کدام مسیر آغاز می‌کنید؟</h2></div><p className="max-w-md text-sm leading-8 text-charcoal-200 md:justify-self-end">هر دسته دریچه‌ای متفاوت به دنیای سنگ‌هاست. برای آشنایی بیشتر، وارد فضای اختصاصی هر مجموعه شوید.</p></div>
          {state.status === 'loading' && <p className="text-sm text-charcoal-200" aria-live="polite">در حال آماده‌سازی مجموعه‌ها...</p>}
          {state.status === 'error' && <StatusPanel title="نمایش دسته‌ها ممکن نشد" description="لطفاً دوباره تلاش کنید."><button onClick={retry} className={BUTTON_SECONDARY}>تلاش دوباره</button></StatusPanel>}
          {state.status === 'ready' && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{state.data.collections.map((item, index) => <CollectionCard key={item.id} collection={item} index={index} variant="overlay" />)}</div>}
          <p className="mt-6 text-xs leading-7 text-charcoal-300">تصاویر مجموعه‌ها نمایشی‌اند و آثار واقعی گالری نیستند.</p>
        </div>
      </section>

      <section aria-labelledby="gallery-works" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="section-kicker"><span /> نگاهی نزدیک‌تر</p><h2 id="gallery-works" className="mt-5 text-3xl font-normal sm:text-4xl">آثار گالری</h2><p className="mt-4 text-sm leading-8 text-charcoal-200">هر اثر، فرصتی برای کشف جزئیات و داستانی متفاوت.</p></div></div>
        {state.status === 'ready' && stones.length > 0 && <div className="mb-10 grid gap-4 border-y border-[#d9e5dc] py-6 md:grid-cols-[1fr_auto] md:items-end"><label className="relative block max-w-xl"><span className="mb-3 block text-xs text-charcoal-200">جست‌وجو در آثار</span><Search size={18} aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 text-bronze-300" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام، نوع، رنگ یا کد اثر" className="w-full border border-charcoal-600 bg-charcoal-900 py-3 pl-4 pr-12 text-sm text-cream-100 outline-none focus:border-bronze-400" /></label><label className="text-xs text-charcoal-200">دسته‌بندی<select value={collection} onChange={(event) => setCollection(event.target.value)} className="mt-3 block min-w-48 border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-sm text-cream-100 focus:border-bronze-400"><option value="all">همه دسته‌ها</option>{state.data.collections.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label></div>}
        {state.status === 'loading' && <p aria-live="polite" className="text-sm text-charcoal-200">در حال آماده‌سازی گالری...</p>}
        {state.status === 'error' && <StatusPanel title="نمایش آثار ممکن نشد" description="لطفاً دوباره تلاش کنید."><button onClick={retry} className={BUTTON_SECONDARY}>تلاش دوباره</button></StatusPanel>}
        {state.status === 'ready' && stones.length === 0 && <div className="grid overflow-hidden rounded-[1.75rem] border border-[#d9e5dc] bg-[#f0f4ed] md:grid-cols-[1fr_0.8fr]"><div className="flex flex-col items-start justify-center p-8 sm:p-12"><p className="text-xs text-bronze-300">به‌زودی در گالری</p><h3 className="mt-4 text-2xl font-normal leading-[1.8]">آثار در حال آماده‌سازی‌اند</h3><p className="mt-4 max-w-md text-sm leading-8 text-charcoal-200">تصاویر و اطلاعات آثار پس از آماده‌سازی در این بخش قرار می‌گیرند. تا آن زمان می‌توانید دسته‌های گالری را کشف کنید.</p><a href="#/category/crystals" className="mt-7 inline-flex items-center gap-3 border-b border-bronze-500 pb-3 text-sm text-cream-100">آشنایی با بلورها و کانی‌ها <ArrowLeft size={16} aria-hidden="true" /></a></div><div className="relative min-h-64 overflow-hidden"><img src={`${import.meta.env.BASE_URL}images/quartz-study.jpg`} alt="تصویر نمایشی از بلورهای کوارتز" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><a href="https://unsplash.com/photos/clear-quartz-crystals-on-dark-metallic-mineral-matrix-V0l3kUa6aBs" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 text-xs text-white underline">Unsplash</a></div></div>}
        {state.status === 'ready' && stones.length > 0 && visible.length === 0 && <StatusPanel title="اثری پیدا نشد" description="عبارت جست‌وجو یا دسته‌بندی را تغییر دهید."><button onClick={() => { setQuery(''); setCollection('all'); window.location.hash = '/gallery'; }} className={BUTTON_SECONDARY}>نمایش همه آثار</button></StatusPanel>}
        {state.status === 'ready' && visible.length > 0 && <><p className="mb-6 text-sm text-charcoal-200" aria-live="polite">{new Intl.NumberFormat('fa-IR').format(visible.length)} اثر</p><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{visible.map((stone, index) => <StoneCard key={stone.id} stone={stone} index={index} />)}</div></>}
      </section>
      <section className="border-t border-[#d9e5dc] bg-[#ffffff] px-6 py-20 sm:px-12 lg:px-20"><div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8"><div><p className="text-xs text-bronze-300">فرصتی برای مکث</p><h2 className="mt-3 text-2xl font-normal leading-[1.8] sm:text-3xl">هر سنگ، روایتی از طبیعت</h2><p className="mt-3 text-sm leading-8 text-charcoal-200">با نگاه و داستان گالری بیشتر آشنا شوید.</p></div><a href="#/about" className="exhibition-button">درباره گالری <ArrowLeft size={16} aria-hidden="true" /></a></div></section>
    </div>
  );
}
