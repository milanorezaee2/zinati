import { Search, ShieldCheck, Sparkles } from 'lucide-react';
import { BUTTON_PRIMARY, EYEBROW } from '@/lib/styles';
import { SITE_CONFIG } from '@/lib/siteConfig';

const STEPS = [
  {
    icon: Search,
    title: 'بررسی منشأ',
    text: 'هر سنگ پیش از ورود به گالری، از نظر منشأ، نوع و سابقه معدن بررسی می‌شود.',
  },
  {
    icon: ShieldCheck,
    title: 'بررسی اصالت',
    text: 'در صورت وجود، گواهی اصالت همراه قطعه نمایش داده می‌شود تا با اطمینان انتخاب کنید.',
  },
  {
    icon: Sparkles,
    title: 'انتخاب بر اساس زیبایی',
    text: 'بافت، رنگ و درخشش هر قطعه در نور طبیعی ارزیابی می‌شود تا تنها آثار خاص به گالری راه یابند.',
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <p className={EYEBROW}>درباره مجموعه</p>
            <h1 className="text-4xl leading-[1.2] text-balance sm:text-5xl">
              سنگ، روایتی است که زمین در طول قرن‌ها نوشته است.
            </h1>
            <div className="flex flex-col gap-5 text-base leading-[1.7] text-ink-500">
              <p>
                {SITE_CONFIG.brandName} گالری‌ای برای معرفی سنگ‌های زینتی است؛ جایی که هر قطعه، مانند اثری در یک نمایشگاه خصوصی، با فضای کافی و جزئیات روشن ارائه می‌شود.
              </p>
              <p>
                مجموعه ما سه دسته دارد: سنگ‌های قیمتی با ارزش ذاتی بالا، سنگ‌های دکوراتیو برای زیباسازی فضا و سنگ‌های کلکسیونی برای علاقه‌مندان به شگفتی‌های طبیعت.
              </p>
            </div>
            <div>
              <a href="#/gallery" className={BUTTON_PRIMARY}>
                ورود به گالری
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-6 rounded-2xl border border-ink-300/50 bg-gradient-to-br from-ivory-200 to-ivory-100 p-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/50 text-gold-600">
                <span className="text-2xl font-bold">گ</span>
              </span>
              <p className="text-2xl leading-[1.6] text-ink-900">{SITE_CONFIG.slogan}</p>
              <p className="text-xs font-medium uppercase tracking-luxe text-gold-600">{SITE_CONFIG.brandName}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-300/40 bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-14 flex max-w-2xl flex-col gap-4">
            <p className={EYEBROW}>شیوه انتخاب سنگ‌ها</p>
            <h2 className="text-3xl sm:text-4xl">اعتماد، از همان ابتدای انتخاب شروع می‌شود</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <article
                key={step.title}
                className="flex flex-col gap-5 rounded-2xl border border-ink-300/40 bg-ivory-50 p-8 transition duration-500 hover:border-gold-400 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/50 text-gold-600">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl">{step.title}</h3>
                <p className="text-sm leading-[1.7] text-ink-500">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl">قطعه‌ای در ذهن دارید؟</h2>
          <p className="text-base leading-[1.7] text-ink-500">
            برای مشاوره، استعلام یا بازدید حضوری با ما در تماس باشید.
          </p>
          <a href="#/contact" className={BUTTON_PRIMARY}>
            تماس و بازدید
          </a>
        </div>
      </section>
    </div>
  );
}
