import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import { normalizeDigits } from '@/lib/format';
import { SITE_CONFIG, whatsappLink } from '@/lib/siteConfig';

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const CONTACT_ITEMS: ContactItem[] = [
  { icon: Phone, label: 'تماس تلفنی', value: normalizeDigits(SITE_CONFIG.phoneDisplay), href: SITE_CONFIG.phoneHref },
  {
    icon: MessageCircle,
    label: 'واتساپ',
    value: 'گفت‌وگو در واتساپ',
    href: whatsappLink('سلام، می‌خواهم درباره سنگ‌های گالری استعلام بگیرم.'),
    external: true,
  },
  { icon: Mail, label: 'ایمیل', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: MapPin, label: 'نشانی', value: SITE_CONFIG.address },
  { icon: Clock, label: 'ساعات کاری', value: SITE_CONFIG.visitHours },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-14 flex max-w-2xl flex-col gap-4">
        <p className="text-sm text-bronze-300">تماس و بازدید</p>
        <h1 className="text-4xl sm:text-5xl">در تماس با گالری باشید</h1>
        <p className="text-base leading-[1.5] text-charcoal-100">
          برای استعلام، مشاوره یا هماهنگی بازدید حضوری، از راه‌های زیر یا فرم کنار صفحه پیام بگذارید.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <ul className="flex flex-col divide-y divide-charcoal-700 rounded-3xl border border-charcoal-700 bg-charcoal-900/60">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze-500/50 text-bronze-400 transition duration-300 group-hover:bg-bronze-400 group-hover:text-charcoal-950">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-xs text-charcoal-200">{item.label}</span>
                  <span dir="auto" className="text-base text-cream-50">
                    {item.value}
                  </span>
                </span>
              </>
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-5 p-6 transition duration-300 hover:bg-charcoal-800/60"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group flex items-center gap-5 p-6">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="rounded-3xl border border-charcoal-700 bg-charcoal-900 p-6 sm:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl">فرم استعلام</h2>
            <p className="text-sm leading-[1.5] text-charcoal-100">
              نام و شماره خود را وارد کنید تا کارشناسان ما با شما هماهنگ کنند.
            </p>
          </div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
