import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24 lg:py-32">
      <div><p className="section-kicker"><span /> درباره گالری</p><h1 className="mt-6 text-4xl font-normal leading-[1.7] sm:text-5xl">روایتی از زیبایی<br /><span className="text-bronze-300">طبیعت و زمان</span></h1><p className="mt-8 text-base leading-[2.7] text-charcoal-200">گوهرآرا فضایی نمایشگاهی برای آشنایی با دنیای سنگ‌هاست؛ جایی برای مکث و تماشای رنگ، ساختار و نقش‌هایی که طبیعت پدید آورده است.</p><p className="mt-4 text-base leading-[2.7] text-charcoal-200">این گالری برای معرفی و شناخت آثار طراحی شده و فروشگاه آنلاین نیست. اطلاعات و تصاویر آثار واقعی پس از آماده‌سازی به مجموعه افزوده می‌شوند.</p><a href="#/" className="mt-8 inline-flex items-center gap-3 border-b border-bronze-500 pb-3 text-sm text-cream-100">بازگشت به صفحه اصلی <ArrowLeft size={16} /></a></div>
      <div className="aspect-[4/5] overflow-hidden rounded-[2rem]"><img src={`${import.meta.env.BASE_URL}images/geodes.jpg`} alt="تصویر نمایشی از برش سنگ" className="h-full w-full object-cover" /></div>
    </div>
  );
}
