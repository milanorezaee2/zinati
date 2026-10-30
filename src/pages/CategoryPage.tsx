import { ArrowLeft, ArrowRight } from 'lucide-react';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import CollectionCard from '@/components/CollectionCard';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCollectionStones } from '@/lib/catalog';
import { fetchCatalog } from '@/lib/stones';
import { BUTTON_SECONDARY } from '@/lib/styles';

const CATEGORY_GUIDE: Record<string, { text: string; examples: string; details: { title: string; text: string }[] }> = {
  gemstones: {
    text: 'گوهرها مواد طبیعی زیبایی هستند که گاهی برای نمایان شدن رنگ و درخشش تراش داده می‌شوند. رنگ، شفافیت و شیوه تراش از جنبه‌های دیدنی آن‌هاست.',
    examples: 'یاقوت، زمرد و یاقوت کبود',
    details: [{ title: 'رنگ', text: 'رنگ و تغییرات ظریف آن می‌تواند اولین ویژگی در تماشای یک گوهر باشد.' }, { title: 'شفافیت', text: 'میزان عبور نور در نمونه‌های مختلف متفاوت است و به جلوه آن‌ها شخصیت می‌دهد.' }, { title: 'تراش', text: 'در نمونه‌های تراش‌خورده، زاویه سطوح بر بازتاب نور و ظاهر سنگ اثر می‌گذارد.' }],
  },
  crystals: {
    text: 'کانی‌ها مواد طبیعی با ترکیب و ساختار مشخص‌اند. برخی از آن‌ها به شکل بلور رشد می‌کنند و شکل هندسی قابل‌توجهی دارند.',
    examples: 'کوارتز، آمتیست و فلوریت',
    details: [{ title: 'شکل بلورها', text: 'به سطوح، لبه‌ها و جهت رشد بلورها در کنار یکدیگر توجه کنید.' }, { title: 'بافت طبیعی', text: 'کانی‌ها می‌توانند روی یک بستر طبیعی رشد کنند و ترکیب‌های دیدنی بسازند.' }, { title: 'نور', text: 'نور و زاویه دید می‌توانند ساختار و جزئیات درونی را آشکارتر کنند.' }],
  },
  geodes: {
    text: 'ژئود ساختاری سنگی است که درون آن می‌تواند با بلورها یا لایه‌های کانی پوشیده شده باشد. برش سنگ نیز نقش و لایه‌های درونی آن را نمایان می‌کند.',
    examples: 'ژئود آمتیست و برش عقیق',
    details: [{ title: 'درون سنگ', text: 'برش می‌تواند دنیایی از ساختارهای پنهان را در معرض دید قرار دهد.' }, { title: 'لایه‌ها', text: 'در برخی نمونه‌ها نوارها و لایه‌های رنگی الگویی طبیعی می‌سازند.' }, { title: 'بلورها', text: 'فضای داخلی بعضی ژئودها با بلورهای کوچک یا بزرگ پوشیده شده است.' }],
  },
  'decorative-stones': {
    text: 'سنگ‌های دکوراتیو به خاطر رنگ، نقش یا فرم خود در فضای داخلی و آثار تزئینی به کار می‌روند. شکل ارائه می‌تواند خام، برش‌خورده یا صیقلی باشد.',
    examples: 'مالاکیت، مرمر و برخی انواع عقیق',
    details: [{ title: 'نقش طبیعی', text: 'رگه‌ها و الگوهای هر نمونه می‌توانند آن را به نقطه تمرکز فضا تبدیل کنند.' }, { title: 'فرم ارائه', text: 'از قطعات خام تا سطوح پرداخت‌شده، هر فرم حسی متفاوت ایجاد می‌کند.' }, { title: 'چیدمان', text: 'پس‌زمینه ساده و نور مناسب به دیده شدن جزئیات سنگ کمک می‌کنند.' }],
  },
};

export default function CategoryPage({ slug }: { slug: string }) {
  const { state, retry } = useAsyncData(fetchCatalog, []);
  if (state.status === 'loading') return <div className="mx-auto max-w-7xl px-6 py-24" aria-busy="true"><div className="h-96 animate-pulse bg-charcoal-800" /></div>;
  if (state.status === 'error') return <div className="mx-auto max-w-7xl px-6 py-24"><StatusPanel title="نمایش این دسته ممکن نشد" description="لطفاً دوباره تلاش کنید."><button type="button" onClick={retry} className={BUTTON_SECONDARY}>تلاش دوباره</button></StatusPanel></div>;
  const collection = state.data.collections.find((item) => item.slug === slug);
  if (!collection) return <div className="mx-auto max-w-7xl px-6 py-24"><StatusPanel title="این دسته پیدا نشد" description="ممکن است نشانی اشتباه باشد."><a href="#/gallery" className={BUTTON_SECONDARY}>بازگشت به گالری</a></StatusPanel></div>;
  const guide = CATEGORY_GUIDE[slug];
  const stones = getCollectionStones(collection, state.data.stones);
  const others = state.data.collections.filter((item) => item.id !== collection.id);

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-[#d9e5dc]">
        {collection.cover_image && <img src={collection.cover_image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#091b24] via-[#091b24]/85 to-[#091b24]/35" />
        <div className="mx-auto flex min-h-[500px] max-w-[1440px] flex-col justify-center px-6 py-20 sm:px-12 lg:min-h-[570px] lg:px-20">
          <a href="#/gallery" className="mb-10 inline-flex w-fit items-center gap-2 text-sm text-white/90 hover:text-[#b9ecd9]"><ArrowRight size={16} aria-hidden="true" /> بازگشت به گالری</a>
          <p className="section-kicker section-kicker-light"><span /> {collection.tagline}</p>
          <h1 className="mt-6 text-4xl font-normal leading-[1.7] text-white sm:text-6xl">{collection.name}</h1>
          <p className="mt-5 max-w-xl text-sm leading-[2.7] text-white/90 sm:text-base">{collection.description}</p>
          <p className="mt-8 text-xs text-white/80">تصویر این بخش نمایشی است.</p>
        </div>
      </section>
      {guide && <section aria-labelledby="category-intro" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 sm:px-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-20 lg:py-32"><div><p className="section-kicker"><span /> آشنایی با این دسته</p><h2 id="category-intro" className="mt-6 text-3xl font-normal leading-[1.8] sm:text-4xl">نگاهی نزدیک‌تر<br /><span className="text-bronze-300">به دنیای سنگ‌ها</span></h2></div><div><p className="text-base leading-[2.8] text-charcoal-200">{guide.text}</p><div className="mt-9 border-r border-bronze-500 pr-5"><p className="text-xs text-bronze-300">برای آشنایی بیشتر</p><p className="mt-3 text-lg leading-8 text-cream-100">{guide.examples}</p><p className="mt-3 text-xs leading-7 text-charcoal-300">این‌ها نمونه‌های عمومی‌اند و به معنی وجودشان در گالری نیستند.</p></div></div></section>}
      {guide && <section aria-labelledby="category-details" className="border-y border-[#d9e5dc] bg-[#ffffff] px-6 py-24 sm:px-12 lg:px-20"><div className="mx-auto max-w-[1280px]"><p className="section-kicker"><span /> راهنمای تماشا</p><h2 id="category-details" className="mt-5 text-3xl font-normal leading-[1.8] sm:text-4xl">در این دسته به چه نگاه کنیم؟</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{guide.details.map((detail, index) => <article key={detail.title} className="h-full rounded-[1.5rem] border border-[#d9e5dc] bg-[#ffffff] p-7 sm:p-8"><p className="font-serif text-4xl text-[#72b6a7]">0{index + 1}</p><h3 className="mt-8 text-xl font-normal">{detail.title}</h3><p className="mt-4 text-sm leading-8 text-charcoal-200">{detail.text}</p></article>)}</div></div></section>}
      <section aria-labelledby="category-works" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-20 lg:py-32"><div className="mb-10"><p className="section-kicker"><span /> آثار این مجموعه</p><h2 id="category-works" className="mt-5 text-3xl font-normal sm:text-4xl">در قاب گالری</h2></div>{stones.length ? <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{stones.map((stone, index) => <StoneCard key={stone.id} stone={stone} index={index} />)}</div> : <div className="rounded-[1.75rem] border border-[#d9e5dc] bg-[#f0f4ed] p-8 sm:p-12"><h3 className="text-2xl font-normal leading-9">آثار این دسته در حال آماده‌سازی‌اند</h3><p className="mt-4 max-w-xl text-sm leading-8 text-charcoal-200">تصاویر و مشخصات آثار پس از آماده‌سازی در این بخش معرفی خواهند شد.</p><a href="#/gallery" className="mt-7 inline-flex items-center gap-3 border-b border-bronze-500 pb-3 text-sm text-cream-100 hover:text-bronze-300">بازگشت به گالری <ArrowLeft size={16} aria-hidden="true" /></a></div>}</section>
      {others.length > 0 && <section aria-labelledby="other-collections" className="border-t border-[#d9e5dc] bg-[#f0f4ed] px-6 py-24 sm:px-12 lg:px-20"><div className="mx-auto max-w-[1280px]"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker"><span /> ادامه گشت‌وگذار</p><h2 id="other-collections" className="mt-5 text-3xl font-normal sm:text-4xl">مجموعه‌های دیگر</h2></div><a href="#/gallery" className="inline-flex items-center gap-3 border-b border-bronze-500 pb-3 text-sm text-cream-100">همه مجموعه‌ها <ArrowLeft size={16} aria-hidden="true" /></a></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((item, index) => <CollectionCard key={item.id} collection={item} index={index} variant="overlay" />)}</div><p className="mt-5 text-xs text-charcoal-300">تصاویر دسته‌ها نمایشی‌اند.</p></div></section>}
    </div>
  );
}
