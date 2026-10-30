import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ChevronLeft, Gem, Layers3, Pause, Play, Plus } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';
import StoneCard from '@/components/StoneCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { fetchCatalog } from '@/lib/stones';
import { COLLECTION_IMAGES } from '@/lib/collectionImages';

const HERO_SLIDES = [
  { background: COLLECTION_IMAGES.gemstones[1], preview: COLLECTION_IMAGES.gemstones[0], label: 'دنیای گوهرها' },
  { background: COLLECTION_IMAGES.crystals[0], preview: COLLECTION_IMAGES.crystals[1], label: 'تماشای بلورها' },
  { background: COLLECTION_IMAGES.geodes[2], preview: COLLECTION_IMAGES.geodes[3], label: 'درون ژئودها' },
  { background: COLLECTION_IMAGES['decorative-stones'][1], preview: COLLECTION_IMAGES['decorative-stones'][0], label: 'بافت سنگ‌ها' },
];

const guide = [
  { number: '۰۱', title: 'رنگ و نقش', text: 'به طیف رنگ‌ها، رگه‌ها و الگوهایی که روی سطح یا درون سنگ دیده می‌شوند توجه کنید.' },
  { number: '۰۲', title: 'فرم و ساختار', text: 'از بلورهای خام تا سطوح صیقلی، شکل هر قطعه زاویه تازه‌ای برای تماشا دارد.' },
  { number: '۰۳', title: 'نور و شفافیت', text: 'نور و زاویه دید می‌توانند درخشش، لایه‌ها و جزئیات متفاوتی را آشکار کنند.' },
];

const questions = [
  { question: 'این گالری چه آثاری را معرفی می‌کند؟', answer: 'ساختار گالری برای معرفی گوهرها، کانی‌ها، ژئودها و سنگ‌های دکوراتیو در نظر گرفته شده است. اطلاعات آثار واقعی پس از آماده‌سازی اضافه می‌شود.' },
  { question: 'آیا این سایت فروشگاه اینترنتی است؟', answer: 'خیر. هدف سایت معرفی و نمایش آثار و کمک به شناخت دنیای سنگ‌هاست؛ خرید و پرداخت آنلاین در آن وجود ندارد.' },
  { question: 'چطور می‌توانم درباره مجموعه بیشتر بدانم؟', answer: 'می‌توانید معرفی هر دسته را مطالعه کنید. اطلاعات ارتباطی و روش ارسال درخواست پس از مشخص شدن در صفحه تماس قرار خواهند گرفت.' },
];

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

export default function HomePage() {
  const { state, retry } = useAsyncData(fetchCatalog, []);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!heroPlaying || reducedMotion) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(timer);
  }, [heroPlaying, reducedMotion]);
  const collections = state.status === 'ready' ? state.data.collections : [];
  const selected = collections.find((item) => item.slug === selectedCollection) ?? collections[0];
  const featured = state.status === 'ready' ? state.data.stones.filter((stone) => stone.featured).slice(0, 3) : [];

  return (
    <div className="exhibition-home">
      {/* Cinematic introduction */}
      <section className="cinematic-hero" aria-labelledby="hero-title">
        <div className="cinematic-hero__visual" aria-hidden="true">
          {HERO_SLIDES.map((slide, index) => <img key={slide.background.image} src={`${import.meta.env.BASE_URL}${slide.background.image}`} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} className={`cinematic-hero__image ${index === heroSlide ? 'is-active' : ''}`} />)}
          <div className="cinematic-hero__shade" />
          <div className="cinematic-hero__light" />
          <div className="cinematic-hero__grain" />
          <div className="cinematic-hero__motes"><i /><i /><i /><i /><i /><i /></div>
        </div>

        <a href="#/" aria-label="گوهرآرا، صفحه اصلی" className="cinematic-brand">
          <span className="cinematic-brand__mark"><Gem size={24} strokeWidth={1.35} aria-hidden="true" /></span>
          <span className="cinematic-brand__name">{SITE_CONFIG.brandName}</span>
          <span className="cinematic-brand__caption" dir="ltr">STONE GALLERY</span>
        </a>

        <div className="cinematic-hero__inner">
          <div className="cinematic-hero__copy">
            <p className="cinematic-eyebrow hero-reveal"><span aria-hidden="true" /> گالری سنگ‌های زینتی و کلکسیونی</p>
            <h1 id="hero-title" className="cinematic-title hero-reveal hero-reveal--delay-1">زیباییِ زمین،<br /><span>در قابِ نگاه شما</span></h1>
            <p className="cinematic-description hero-reveal hero-reveal--delay-2">دعوتی به دنیای سنگ‌ها؛ جایی برای مکث، تماشای جزئیات و کشف زیبایی‌هایی که طبیعت در گذر زمان خلق کرده است.</p>
            <div className="cinematic-actions hero-reveal hero-reveal--delay-3">
              <button type="button" onClick={() => goTo('collections')} className="cinematic-primary">کشف دسته‌بندی‌ها <span><ArrowLeft size={17} aria-hidden="true" /></span></button>
              <a href="#/about" className="cinematic-secondary">درباره گالری <ArrowLeft size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-preview" aria-label="پیش‌نمایش تصاویر گالری">
            <div className="hero-preview__heading"><div><span className="hero-preview__eyebrow">قابی از طبیعت</span><p className="hero-preview__title">{HERO_SLIDES[heroSlide].label}</p></div><span className="hero-preview__count" dir="ltr">0{heroSlide + 1} <span>/</span> 04</span></div>
            <div className="hero-preview__featured"><img src={`${import.meta.env.BASE_URL}${HERO_SLIDES[heroSlide].preview.image}`} alt={HERO_SLIDES[heroSlide].preview.title} /><span>تصویر نمایشی</span></div>
            <div className="hero-preview__thumbnails">
              {HERO_SLIDES.map((slide, index) => <button key={slide.preview.image} type="button" onClick={() => { setHeroSlide(index); setHeroPlaying(false); }} aria-label={`نمایش تصویر ${slide.label}`} aria-pressed={heroSlide === index} className={`hero-preview__thumb ${heroSlide === index ? 'is-active' : ''}`}><img src={`${import.meta.env.BASE_URL}${slide.preview.image}`} alt="" loading="lazy" /></button>)}
            </div>
            <div className="hero-preview__footer"><span><a href={HERO_SLIDES[heroSlide].preview.sourceUrl} target="_blank" rel="noreferrer">منبع تصویر پیش‌نمایش</a> · <a href={HERO_SLIDES[heroSlide].background.sourceUrl} target="_blank" rel="noreferrer">منبع پس‌زمینه</a></span>{!reducedMotion && <button type="button" onClick={() => setHeroPlaying((playing) => !playing)} className="hero-preview__play" aria-label={heroPlaying ? 'توقف پخش خودکار تصاویر' : 'شروع پخش خودکار تصاویر'}>{heroPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{heroPlaying ? 'توقف نمایش' : 'پخش تصاویر'}</button>}</div>
          </div>
        </div>

        <div className="cinematic-bottom">
          <button type="button" onClick={() => goTo('collections')} className="cinematic-scroll"><span className="cinematic-scroll__icon"><ArrowDown size={15} aria-hidden="true" /></span><span>آغاز تماشا</span></button>
          <span className="cinematic-bottom__line" aria-hidden="true" />
          <span className="cinematic-bottom__caption" dir="ltr">AN EXHIBITION OF NATURE <span>—</span> 01</span>
        </div>
      </section>

      {/* 02 — collection taxonomy */}
      <section id="collections" aria-labelledby="collections-title" className="scroll-mt-24 border-b border-[#d9e5dc] bg-[#f0f4ed] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div><p className="section-kicker"><span /> جهان سنگ‌ها</p><h2 id="collections-title" className="mt-5 text-3xl font-normal leading-[1.7] sm:text-4xl">از کجا شروع کنیم؟</h2></div>
            <p className="max-w-md text-sm leading-8 text-charcoal-200 md:justify-self-end">چهار مسیر برای کاوش در دنیای سنگ‌ها؛ دسته‌ای را انتخاب کنید و با ویژگی‌های آن بیشتر آشنا شوید.</p>
          </div>
          {state.status === 'loading' && <p className="text-sm text-charcoal-200" aria-live="polite">در حال آماده‌سازی دسته‌بندی‌ها...</p>}
          {state.status === 'error' && <div className="border border-[#d9e5dc] p-8 text-sm leading-8 text-charcoal-200"><p>امکان نمایش دسته‌بندی‌ها وجود ندارد.</p><button onClick={retry} className="mt-3 text-bronze-300 underline underline-offset-4">تلاش دوباره</button></div>}
          {state.status === 'ready' && selected && (
            <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-7">
              <aside aria-label="انتخاب دسته‌بندی سنگ‌ها" className="self-start rounded-[1.5rem] border border-[#d9e5dc] bg-white p-4 shadow-[0_12px_40px_rgba(27,69,55,0.05)] sm:p-5 lg:sticky lg:top-6">
                <div className="mb-4 flex items-center gap-3 border-b border-[#e5ede6] px-2 pb-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f2e9] text-bronze-300"><Layers3 size={20} aria-hidden="true" /></span>
                  <div><h3 className="text-base font-semibold text-cream-50">دسته‌بندی‌ها</h3><p className="mt-1 text-xs text-charcoal-200">مجموعه مورد نظر خود را انتخاب کنید</p></div>
                </div>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {collections.map((collection, index) => {
                    const active = collection.id === selected.id;
                    return <button key={collection.id} type="button" aria-pressed={active} aria-controls="collection-preview" onClick={() => setSelectedCollection(collection.slug)} className={`group flex min-h-[68px] w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze-400 ${active ? 'bg-[#e6f2e9] text-bronze-300' : 'text-cream-100 hover:bg-[#f4f8f4]'}`}>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs ${active ? 'bg-white font-semibold text-bronze-300' : 'bg-[#f0f4ed] text-charcoal-200'}`}>{new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(index + 1)}</span>
                      <span className="min-w-0 flex-1"><span className={`block text-sm leading-6 ${active ? 'font-semibold' : 'font-medium'}`}>{collection.name}</span><span className="mt-1 block text-xs text-charcoal-200">{collection.tagline}</span></span>
                      <ChevronLeft size={17} aria-hidden="true" className={`shrink-0 transition ${active ? 'text-bronze-300' : 'text-charcoal-400 group-hover:text-bronze-300'}`} />
                    </button>;
                  })}
                </div>
                <a href="#/gallery" className="mt-4 flex items-center justify-between gap-3 border-t border-[#e5ede6] px-3 pt-5 text-sm text-bronze-300 hover:text-bronze-700">مشاهده همه مجموعه‌ها <ArrowLeft size={16} aria-hidden="true" /></a>
              </aside>
              <div id="collection-preview" className="min-w-0">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-5 rounded-[1.5rem] border border-[#d9e5dc] bg-white px-6 py-6 sm:px-8">
                  <div><p className="section-kicker"><span /> {selected.tagline}</p><h3 className="mt-3 text-2xl font-semibold leading-9 text-cream-50">{selected.name}</h3><p className="mt-2 max-w-2xl text-sm leading-8 text-charcoal-200">{selected.description}</p></div>
                  <a href={`#/category/${selected.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-bronze-300 hover:text-bronze-700">آشنایی با این مجموعه <ArrowLeft size={16} aria-hidden="true" /></a>
                </div>
                <p className="mb-4 text-xs leading-7 text-charcoal-200" aria-live="polite">۱۰ کارت تصویری نمایشی از دسته {selected.name}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {(COLLECTION_IMAGES[selected.slug] ?? []).map((photo, index) => (
                    <article key={photo.image} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-[#d9e5dc] bg-white shadow-[0_8px_24px_rgba(27,69,55,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(27,69,55,0.10)]">
                      <a href={`${import.meta.env.BASE_URL}${photo.image}`} target="_blank" rel="noopener noreferrer" aria-label={`مشاهده تصویر بزرگ‌تر ${photo.title}`} className="block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze-400">
                        <img src={`${import.meta.env.BASE_URL}${photo.image}`} alt={photo.title} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                      </a>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-2 text-xs text-bronze-300"><span>{selected.name}</span><span>{new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(index + 1)}</span></div>
                        <h4 className="mt-3 text-base font-semibold leading-8 text-cream-50">{photo.title}</h4>
                        <p className="mt-2 flex-1 text-sm leading-7 text-charcoal-200">{photo.description}</p>
                        <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#e5ede6] pt-4 text-xs"><span className="text-charcoal-300">تصویر نمایشی</span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-bronze-300 underline underline-offset-2" aria-label={`منبع تصویر ${photo.title}: ${photo.source}`}>منبع: {photo.source}</a></div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
          <p className="mt-7 text-xs leading-7 text-charcoal-300">تصاویر این صفحه نمایشی‌اند و آثار واقعی مجموعه نیستند. دسته‌ها می‌توانند از نظر نوع و شکل ارائه با یکدیگر هم‌پوشانی داشته باشند.</p>
        </div>
      </section>

      <section aria-labelledby="forms-title" className="bg-[#f8f9f4] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"><div><p className="section-kicker"><span /> فرم‌های طبیعت</p><h2 id="forms-title" className="mt-5 text-3xl font-normal leading-[1.7] sm:text-4xl">یک سنگ، نگاه‌های بی‌شمار</h2></div><p className="max-w-md text-sm leading-8 text-charcoal-200 md:justify-self-end">سنگ‌ها تنها با نامشان شناخته نمی‌شوند؛ شکل ارائه، بافت و برش نیز تجربه تماشای آن‌ها را تغییر می‌دهد.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <a href="#/category/crystals" className="group flex h-full min-w-0 flex-col rounded-[1.5rem] border border-[#d9e5dc] bg-[#ffffff] p-7 sm:p-8 transition hover:border-bronze-400"><span className="text-xs tracking-[.2em] text-bronze-300" dir="ltr">01 / RAW</span><div className="my-8 h-px w-12 bg-bronze-500" /><h3 className="text-2xl font-normal">خام و طبیعی</h3><p className="mt-4 flex-1 text-sm leading-8 text-charcoal-200">فرم‌های دست‌نخورده و بلورهایی که ساختار طبیعی سنگ را نمایان می‌کنند.</p><span className="mt-7 inline-flex items-center gap-3 text-sm text-bronze-300">کشف کانی‌ها <ArrowLeft size={16} aria-hidden="true" /></span></a>
            <a href="#/category/geodes" className="group flex h-full min-w-0 flex-col rounded-[1.5rem] border border-[#d9e5dc] bg-[#ffffff] p-7 sm:p-8 transition hover:border-bronze-400"><span className="text-xs tracking-[.2em] text-bronze-300" dir="ltr">02 / SLICED</span><div className="my-8 h-px w-12 bg-bronze-500" /><h3 className="text-2xl font-normal">برش‌خورده</h3><p className="mt-4 flex-1 text-sm leading-8 text-charcoal-200">برش، لایه‌ها و نقش‌های پنهان در دل سنگ را پیش چشم ما قرار می‌دهد.</p><span className="mt-7 inline-flex items-center gap-3 text-sm text-bronze-300">کشف ژئودها <ArrowLeft size={16} aria-hidden="true" /></span></a>
            <a href="#/category/decorative-stones" className="group flex h-full min-w-0 flex-col rounded-[1.5rem] border border-[#d9e5dc] bg-[#ffffff] p-7 sm:p-8 transition hover:border-bronze-400"><span className="text-xs tracking-[.2em] text-bronze-300" dir="ltr">03 / POLISHED</span><div className="my-8 h-px w-12 bg-bronze-500" /><h3 className="text-2xl font-normal">صیقلی و پرداخت‌شده</h3><p className="mt-4 flex-1 text-sm leading-8 text-charcoal-200">سطحی هموار که می‌تواند رنگ، بافت و جلوه سنگ را بهتر نشان دهد.</p><span className="mt-7 inline-flex items-center gap-3 text-sm text-bronze-300">کشف سنگ‌های دکوراتیو <ArrowLeft size={16} aria-hidden="true" /></span></a>
          </div>
        </div>
      </section>

      <section id="formation" aria-labelledby="formation-title" className="scroll-mt-24 border-y border-[#d9e5dc] bg-[#e6efe8] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="section-kicker"><span /> سفری در دل زمین</p><h2 id="formation-title" className="mt-5 text-3xl font-normal leading-[1.8] sm:text-4xl">از دل زمین<br /><span className="text-bronze-300">تا قاب تماشا</span></h2></div><p className="max-w-lg text-sm leading-8 text-charcoal-200 lg:justify-self-end">سنگ‌ها و کانی‌ها در شرایط گوناگونی شکل می‌گیرند. این مسیر، نگاهی ساده به داستانی است که برای هر نمونه می‌تواند متفاوت باشد.</p></div>
          <ol className="mt-16 grid gap-10 border-t border-[#c6d9cb] pt-8 md:grid-cols-3 md:gap-12">
            <li><span className="font-serif text-5xl font-normal text-[#317d6d]">01</span><h3 className="mt-7 text-xl font-normal">آغاز در طبیعت</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">مواد معدنی در محیط‌های مختلف و تحت شرایطی مانند تغییر دما، فشار یا حضور محلول‌ها پدید می‌آیند.</p></li>
            <li><span className="font-serif text-5xl font-normal text-[#317d6d]">02</span><h3 className="mt-7 text-xl font-normal">شکل‌گیری جزئیات</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">ترکیب و شرایط رشد می‌توانند به شکل‌گیری رنگ‌ها، بلورها و بافت‌های گوناگون کمک کنند.</p></li>
            <li><span className="font-serif text-5xl font-normal text-[#317d6d]">03</span><h3 className="mt-7 text-xl font-normal">آماده برای تماشا</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">یک نمونه ممکن است به شکل طبیعی باقی بماند یا با برش و پرداخت، جلوه تازه‌ای پیدا کند.</p></li>
          </ol>
        </div>
      </section>

      {/* 03 — purpose of the exhibition */}
      <section aria-labelledby="story-title" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 sm:px-12 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-20 lg:py-32">
        <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.75rem] bg-charcoal-800"><img src={`${import.meta.env.BASE_URL}images/geodes.jpg`} alt="تصویر نمایشی از برش سنگ" className="h-full w-full object-cover" loading="lazy" /><div className="absolute bottom-5 right-5 border border-white/30 px-5 py-3 text-[10px] tracking-[.25em] text-white" dir="ltr">THE ART OF NATURE</div></div>
        <div className="max-w-xl"><p className="section-kicker"><span /> نگاه ما</p><h2 id="story-title" className="mt-6 text-3xl font-normal leading-[1.8] sm:text-4xl">هر سنگ،<br /><span className="text-bronze-300">داستانی برای تماشا دارد.</span></h2><p className="mt-7 text-sm leading-[2.7] text-charcoal-200 sm:text-base">از نقش‌های ظریف تا رنگ‌های عمیق، سنگ‌ها نشانی از گذر زمان و دگرگونی‌های طبیعت را با خود دارند. گوهرآرا فضایی نمایشگاهی برای مکث و شناخت این زیبایی‌هاست.</p><a href="#/about" className="mt-8 inline-flex items-center gap-4 border-b border-bronze-500 pb-3 text-sm text-cream-100 hover:text-bronze-300">بیشتر درباره گالری <ArrowLeft size={16} aria-hidden="true" /></a></div>
      </section>

      <section aria-labelledby="crystal-title" className="overflow-hidden bg-[#d9ebe8] px-6 py-24 text-[#193b40] sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          <div className="relative"><div className="absolute -right-4 -top-4 h-32 w-32 border-r border-t border-[#75a69c] sm:-right-6 sm:-top-6" aria-hidden="true" /><img src={`${import.meta.env.BASE_URL}images/quartz-study.jpg`} alt="بلورهای کوارتز روی بستری از کانی تیره، تصویری نمایشی" loading="lazy" className="relative aspect-[4/4.5] w-full object-cover" /><a href="https://unsplash.com/photos/clear-quartz-crystals-on-dark-metallic-mineral-matrix-V0l3kUa6aBs" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-[#436b64] underline underline-offset-4">منبع تصویر: Unsplash</a></div>
          <div className="max-w-xl"><p className="flex items-center gap-4 text-xs text-[#376f67]"><span className="h-px w-8 bg-[#376f67]" /> مطالعه یک فرم طبیعی</p><h2 id="crystal-title" className="mt-6 text-3xl font-normal leading-[1.8] text-[#193b40] sm:text-4xl">وقتی طبیعت<br /><span className="text-[#376f67]">هندسه می‌آفریند</span></h2><p className="mt-6 text-sm leading-[2.8] text-[#395e5d] sm:text-base">بلورها گاهی با سطح‌ها و زاویه‌هایی منظم رشد می‌کنند. کوارتز یکی از کانی‌های شناخته‌شده‌ای است که می‌تواند در شکل‌ها و رنگ‌های متنوعی دیده شود.</p><div className="mt-9 grid grid-cols-2 gap-5 border-t border-[#91b9b1] pt-6"><div><span className="text-xs text-[#376f67]">آنچه می‌بینید</span><p className="mt-2 text-sm leading-7 text-[#264b49]">فرم و جهت رشد بلورها</p></div><div><span className="text-xs text-[#376f67]">نکته تماشا</span><p className="mt-2 text-sm leading-7 text-[#264b49]">بازی نور روی سطوح</p></div></div><a href="#/category/crystals" className="mt-9 inline-flex items-center gap-4 border-b border-[#376f67] pb-3 text-sm text-[#264b49] hover:text-[#376f67]">ورود به دنیای بلورها <ArrowLeft size={16} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section aria-labelledby="color-title" className="relative isolate overflow-hidden px-6 py-24 sm:px-12 lg:px-20 lg:py-36">
        <img src={`${import.meta.env.BASE_URL}images/gemstones.jpg`} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#091b24]/95 via-[#091b24]/85 to-[#091b24]/55" />
        <div className="mx-auto max-w-[1280px]"><div className="max-w-2xl"><p className="section-kicker section-kicker-light"><span /> طیف طبیعت</p><h2 id="color-title" className="mt-6 text-3xl font-normal leading-[1.8] text-white sm:text-5xl">رنگ‌هایی که<br /><span className="text-[#b9ecd9]">زمین روایت می‌کند.</span></h2><p className="mt-7 max-w-lg text-sm leading-[2.7] text-white/90 sm:text-base">از سبزهای عمیق تا رنگ‌های گرم و خاکی، دنیای سنگ‌ها طیفی از جلوه‌ها را در خود جای داده است. هر رنگ، نقطه شروعی برای کشف جزئیات بیشتر است.</p><div className="mt-8 flex items-center gap-3" aria-hidden="true"><span className="h-8 w-8 rounded-full border border-white/30 bg-[#445c48]" /><span className="h-8 w-8 rounded-full border border-white/30 bg-[#886742]" /><span className="h-8 w-8 rounded-full border border-white/30 bg-[#514860]" /><span className="h-8 w-8 rounded-full border border-white/30 bg-[#a29782]" /></div><a href="#/category/gemstones" className="mt-9 inline-flex items-center gap-4 border-b border-bronze-500 pb-3 text-sm text-white hover:text-[#b9ecd9]">آشنایی با دنیای گوهرها <ArrowLeft size={16} aria-hidden="true" /></a></div></div>
      </section>

      <section aria-labelledby="encounter-title" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="relative min-h-[400px] overflow-hidden rounded-[1.75rem] bg-charcoal-800 sm:min-h-[520px]"><img src={`${import.meta.env.BASE_URL}images/geodes.jpg`} alt="تصویر نمایشی از لایه‌های برش سنگ" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-7 right-7 text-xs tracking-[.14em] text-cream-100" dir="ltr">A CLOSER LOOK / 01</div></div>
          <div className="flex flex-col justify-center rounded-[1.75rem] border border-[#d9e5dc] bg-[#f0f4ed] p-8 sm:p-12 lg:p-14"><p className="section-kicker"><span /> تماشای درون سنگ</p><h2 id="encounter-title" className="mt-6 text-3xl font-normal leading-[1.8] sm:text-4xl">شگفتی در<br /><span className="text-bronze-300">لایه‌های پنهان</span></h2><p className="mt-6 text-sm leading-[2.7] text-charcoal-200">گاهی برش یک سنگ، نقشی را آشکار می‌کند که از بیرون دیده نمی‌شود. در ژئودها نیز فضای درونی می‌تواند با بلورها یا لایه‌هایی از کانی پوشیده شده باشد.</p><a href="#/category/geodes" className="mt-8 inline-flex w-fit items-center gap-4 border-b border-bronze-500 pb-3 text-sm text-cream-100 hover:text-bronze-300">نگاهی به ژئود و برش سنگ <ArrowLeft size={16} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section aria-labelledby="character-title" className="border-y border-[#d9e5dc] bg-[#f8f9f4] px-6 py-24 sm:px-12 lg:px-20 lg:py-32"><div className="mx-auto max-w-[1280px]"><div className="mb-14 max-w-2xl"><p className="section-kicker"><span /> ویژگی‌های دیدنی</p><h2 id="character-title" className="mt-5 text-3xl font-normal leading-[1.8] sm:text-4xl">چه چیزی هر سنگ را<br /><span className="text-bronze-300">متفاوت می‌کند؟</span></h2><p className="mt-5 text-sm leading-8 text-charcoal-200">چند ویژگی ساده به ما کمک می‌کنند هر نمونه را با دقت بیشتری ببینیم؛ بدون اینکه از ظاهر آن درباره اصالت یا ارزشش نتیجه‌گیری کنیم.</p></div><div className="grid gap-5 md:grid-cols-3"><article className="h-full rounded-[1.5rem] border border-[#d9e5dc] border-t-bronze-500 bg-[#ffffff] p-8"><p className="font-serif text-4xl text-[#317d6d]">01</p><h3 className="mt-8 text-xl font-normal">درخشش</h3><p className="mt-3 text-sm leading-8 text-charcoal-200">نحوه بازتاب نور از سطح؛ از جلوه شیشه‌ای تا ظاهر مات و نرم.</p></article><article className="h-full rounded-[1.5rem] border border-[#d9e5dc] border-t-bronze-500 bg-[#ffffff] p-8"><p className="font-serif text-4xl text-[#317d6d]">02</p><h3 className="mt-8 text-xl font-normal">شفافیت</h3><p className="mt-3 text-sm leading-8 text-charcoal-200">میزان عبور نور از یک نمونه؛ سنگ‌ها می‌توانند شفاف، نیمه‌شفاف یا کدر باشند.</p></article><article className="h-full rounded-[1.5rem] border border-[#d9e5dc] border-t-bronze-500 bg-[#ffffff] p-8"><p className="font-serif text-4xl text-[#317d6d]">03</p><h3 className="mt-8 text-xl font-normal">بافت و الگو</h3><p className="mt-3 text-sm leading-8 text-charcoal-200">رگه‌ها، لایه‌ها و دانه‌ها می‌توانند هر سطح را به منظره‌ای متفاوت تبدیل کنند.</p></article></div></div></section>

      {/* 04 — real pieces appear here when the local catalogue has them */}
      <section aria-labelledby="highlights-title" className="border-y border-[#d9e5dc] bg-[#f0f4ed] px-6 py-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-[1280px]"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="section-kicker"><span /> از نزدیک</p><h2 id="highlights-title" className="mt-5 text-3xl font-normal sm:text-4xl">آثار منتخب گالری</h2></div><a href="#/gallery" className="inline-flex items-center gap-3 border-b border-bronze-500 pb-3 text-sm text-cream-100 hover:text-bronze-300">ورود به گالری <ArrowLeft size={16} aria-hidden="true" /></a></div>
          {state.status === 'ready' && featured.length > 0 ? <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{featured.map((stone, index) => <StoneCard key={stone.id} stone={stone} index={index} />)}</div> : <div className="rounded-[1.75rem] border border-[#d9e5dc] bg-[#f0f4ed] px-7 py-12 sm:px-12"><p className="text-lg text-cream-100">معرفی آثار در حال آماده‌سازی است.</p><p className="mt-3 max-w-xl text-sm leading-8 text-charcoal-200">پس از آماده شدن تصاویر و اطلاعات واقعی، قطعات منتخب در این بخش نمایش داده می‌شوند.</p><button type="button" onClick={() => goTo('collections')} className="mt-5 text-sm text-bronze-300 underline underline-offset-4">آشنایی با دسته‌ها</button></div>}
        </div>
      </section>

      {/* 05 — visitor guide */}
      <section id="guide" aria-labelledby="guide-title" className="scroll-mt-24 mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-20 lg:py-32"><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24"><div className="max-w-xl"><p className="section-kicker"><span /> راهنمای تماشا</p><h2 id="guide-title" className="mt-6 text-3xl font-normal leading-[1.8] sm:text-4xl">زیبایی، در جزئیات<br /><span className="text-bronze-300">آشکار می‌شود.</span></h2><p className="mt-6 text-sm leading-[2.7] text-charcoal-200 sm:text-base">برای لذت بردن از تماشای یک سنگ، لازم نیست متخصص باشید. با این سه نگاه ساده شروع کنید.</p><div className="mt-10 divide-y divide-[#d9e5dc] border-y border-[#d9e5dc]">{guide.map((item) => <div className="flex gap-6 py-5" key={item.number}><span className="text-lg text-bronze-400">{item.number}</span><div><h3 className="text-base font-normal">{item.title}</h3><p className="mt-2 text-sm leading-7 text-charcoal-200">{item.text}</p></div></div>)}</div></div><div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.75rem] bg-charcoal-800"><img src={`${import.meta.env.BASE_URL}images/decorative.jpg`} alt="تصویر نمایشی از نقش یک سنگ دکوراتیو" loading="lazy" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><span className="absolute bottom-6 right-6 border-r border-white pr-4 text-xs leading-7 text-white">هر نقش،<br />روایتی از طبیعت</span></div></div></section>

      <section aria-labelledby="glossary-title" className="px-6 pb-24 sm:px-12 lg:px-20 lg:pb-32"><div className="mx-auto max-w-[1280px] border-t border-[#d9e5dc] pt-20"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker"><span /> واژه‌نامه کوتاه</p><h2 id="glossary-title" className="mt-5 text-3xl font-normal leading-[1.7] sm:text-4xl">با زبان سنگ‌ها آشنا شوید</h2></div><p className="max-w-sm text-sm leading-8 text-charcoal-200">چند واژه ساده برای شروع شناخت این جهان شگفت‌انگیز.</p></div><div className="grid gap-px border border-[#d9e5dc] bg-[#d8e4db] md:grid-cols-3"><article className="bg-[#f0f4ed] p-8 sm:p-10"><span className="text-xs tracking-[.2em] text-bronze-400" dir="ltr">MINERAL</span><h3 className="mt-5 text-2xl font-normal">کانی</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">ماده‌ای طبیعی با ترکیب شیمیایی و ساختار مشخص که سنگ‌ها می‌توانند از آن تشکیل شوند.</p></article><article className="bg-[#f0f4ed] p-8 sm:p-10"><span className="text-xs tracking-[.2em] text-bronze-400" dir="ltr">CRYSTAL</span><h3 className="mt-5 text-2xl font-normal">بلور</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">ماده‌ای با ساختار درونی منظم که گاهی در طبیعت به شکل‌های هندسی دیده می‌شود.</p></article><article className="bg-[#f0f4ed] p-8 sm:p-10"><span className="text-xs tracking-[.2em] text-bronze-400" dir="ltr">GEODE</span><h3 className="mt-5 text-2xl font-normal">ژئود</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">ساختاری سنگی با فضای درونی که می‌تواند با بلورها یا لایه‌های کانی پوشیده شده باشد.</p></article></div></div></section>

      <section aria-labelledby="display-title" className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-12 lg:px-20 lg:pb-32"><div className="grid overflow-hidden rounded-[1.75rem] border border-[#d9e5dc] lg:grid-cols-2"><div className="relative min-h-[360px] bg-charcoal-800"><img src={`${import.meta.env.BASE_URL}images/decorative.jpg`} alt="تصویر نمایشی از سنگی با نقش دکوراتیو" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><span className="absolute bottom-6 right-6 text-xs tracking-[.2em] text-white" dir="ltr">NATURE IN SPACE</span></div><div className="flex flex-col justify-center bg-[#ffffff] p-8 sm:p-12 lg:p-16"><p className="section-kicker"><span /> سنگ در فضا</p><h2 id="display-title" className="mt-6 text-3xl font-normal leading-[1.8] sm:text-4xl">هنر طبیعی،<br /><span className="text-bronze-300">در کنار زندگی</span></h2><p className="mt-6 text-sm leading-[2.7] text-charcoal-200">در یک چیدمان نمایشگاهی، فضای اطراف و نور مناسب فرصت می‌دهند فرم و بافت سنگ بهتر دیده شود. یک پس‌زمینه ساده می‌تواند نگاه را به جزئیات قطعه هدایت کند.</p><a href="#/category/decorative-stones" className="mt-8 inline-flex w-fit items-center gap-4 border-b border-bronze-500 pb-3 text-sm text-cream-100 hover:text-bronze-300">آشنایی با سنگ‌های دکوراتیو <ArrowLeft size={16} aria-hidden="true" /></a></div></div></section>

      <section id="care" aria-labelledby="care-title" className="scroll-mt-24 bg-[#dbece9] px-6 py-24 text-[#193b40] sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1280px]"><div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="flex items-center gap-4 text-xs text-[#376f67]"><span className="h-px w-8 bg-[#376f67]" /> مراقبت از سنگ‌ها</p><h2 id="care-title" className="mt-5 text-3xl font-normal leading-[1.8] text-[#193b40] sm:text-4xl">زیبایی ماندگار،<br />با مراقبت آگاهانه</h2></div><p className="max-w-lg text-sm leading-8 text-[#395e5d] lg:justify-self-end">سنگ‌ها ویژگی‌های یکسانی ندارند. پیش از هر روش تمیزکاری یا نگهداری، نوع و شرایط قطعه را بشناسید.</p></div>
          <div className="mt-14 grid gap-8 border-t border-[#91b9b1] pt-9 md:grid-cols-3"><article><span className="text-xs text-[#376f67]">۰۱ / نگهداری</span><h3 className="mt-4 text-xl font-normal text-[#193b40]">از ضربه دور نگه دارید</h3><p className="mt-3 text-sm leading-8 text-[#395e5d]">قطعات را در جایی پایدار قرار دهید و هنگام جابه‌جایی با دقت از آن‌ها محافظت کنید.</p></article><article><span className="text-xs text-[#376f67]">۰۲ / شرایط محیط</span><h3 className="mt-4 text-xl font-normal text-[#193b40]">به نور و گرما توجه کنید</h3><p className="mt-3 text-sm leading-8 text-[#395e5d]">برخی سنگ‌ها به نور شدید یا تغییرات دما حساس‌اند؛ شرایط مناسب به جنس قطعه بستگی دارد.</p></article><article><span className="text-xs text-[#376f67]">۰۳ / تمیزکاری</span><h3 className="mt-4 text-xl font-normal text-[#193b40]">پیش از تمیزکردن بررسی کنید</h3><p className="mt-3 text-sm leading-8 text-[#395e5d]">آب، مواد شوینده و روش‌های مکانیکی برای همه سنگ‌ها مناسب نیستند؛ ابتدا راهنمای مخصوص قطعه را بررسی کنید.</p></article></div>
        </div>
      </section>

      <section aria-labelledby="discover-title" className="px-6 py-24 sm:px-12 lg:px-20"><div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="section-kicker"><span /> ادامه کشف</p><h2 id="discover-title" className="mt-5 text-3xl font-normal leading-[1.8] sm:text-4xl">هر مسیر،<br /><span className="text-bronze-300">یک کشف تازه</span></h2><p className="mt-5 max-w-sm text-sm leading-8 text-charcoal-200">یکی از موضوعات را انتخاب کنید و با دنیای سنگ‌ها بیشتر آشنا شوید.</p></div><div className="border-y border-[#d9e5dc]">{[{ number: '۰۱', title: 'درخشش و رنگ گوهرها', subtitle: 'سنگ‌های قیمتی', href: '#/category/gemstones' }, { number: '۰۲', title: 'ساختارهای هندسی طبیعت', subtitle: 'بلورها و کانی‌ها', href: '#/category/crystals' }, { number: '۰۳', title: 'نقش‌های پنهان در سنگ', subtitle: 'ژئود و برش سنگ', href: '#/category/geodes' }, { number: '۰۴', title: 'طبیعت در فضای زندگی', subtitle: 'سنگ‌های دکوراتیو', href: '#/category/decorative-stones' }].map((item) => <a key={item.href} href={item.href} className="group flex items-center gap-5 border-b border-[#d9e5dc] py-6 last:border-0"><span className="text-sm text-bronze-400">{item.number}</span><span className="flex-1"><span className="block text-xs text-charcoal-300">{item.subtitle}</span><span className="mt-2 block text-lg text-cream-100 transition group-hover:text-bronze-300">{item.title}</span></span><ArrowLeft size={18} className="text-bronze-400 transition group-hover:-translate-x-1" aria-hidden="true" /></a>)}</div></div></section>

      {/* 06 — common questions */}
      <section aria-labelledby="faq-title" className="border-y border-[#d9e5dc] bg-[#f0f4ed] px-6 py-24 sm:px-12 lg:px-20"><div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="section-kicker"><span /> بیشتر بدانید</p><h2 id="faq-title" className="mt-5 text-3xl font-normal leading-[1.7] sm:text-4xl">پرسش‌های متداول</h2><p className="mt-4 max-w-sm text-sm leading-8 text-charcoal-200">چند پاسخ کوتاه برای آشنایی با فضای این گالری.</p></div><div className="divide-y divide-[#d9e5dc] border-y border-[#d9e5dc]">{questions.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base text-cream-100 [&::-webkit-details-marker]:hidden">{item.question}<Plus size={18} className="shrink-0 text-bronze-400 transition group-open:rotate-45" aria-hidden="true" /></summary><p className="mt-4 max-w-xl text-sm leading-8 text-charcoal-200">{item.answer}</p></details>)}</div></div></section>

      {/* 07 — contact */}
      <section aria-labelledby="contact-title" className="px-6 py-24 sm:px-12 lg:px-20"><div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#d9e5dc] bg-[#ffffff] px-7 py-20 text-center sm:px-16"><p className="text-xs text-bronze-300">ارتباط با گالری</p><h2 id="contact-title" className="mt-5 text-3xl font-normal leading-[1.8] sm:text-4xl">گفت‌وگو درباره دنیای سنگ‌ها</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-charcoal-200">اطلاعات ارتباط با گالری و روش ارسال درخواست در حال آماده‌سازی است.</p><a href="#/contact" className="exhibition-button mt-8">صفحه ارتباط با ما <ArrowLeft size={17} aria-hidden="true" /></a></div></section>
    </div>
  );
}
