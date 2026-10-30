import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import { normalizeDigits } from '@/lib/format';
import { SITE_CONFIG, whatsappLink } from '@/lib/siteConfig';
import { EYEBROW } from '@/lib/styles';

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
        <p className={EYEBROW}>تماس و بازدید</p>
        <h1 className="text-4xl sm:text-5xl">در تماس با گالری باشید</h1>
        <p className="text-base leading-[1.7] text-ink-500">
          برای استعلام، مشاوره یا هماهنگی بازدید حضوری، از راه‌های زیر یا فرم کنار صفحه پیام بگذارید.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <ul className="flex flex-col divide-y divide-ink-300/40 rounded-2xl border border-ink-300/40 bg-ivory-100">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/50 text-gold-600 transition duration-400 group-hover:bg-ink-900 group-hover:text-ivory-50 group-hover:border-ink-900">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-luxe text-gold-600">{item.label}</span>
                  <span dir="auto" className="text-base text-ink-900">
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
                    className="group flex items-center gap-5 p-6 transition duration-400 hover:bg-ivory-200/50"
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

        <div className="rounded-2xl border border-ink-300/40 bg-ivory-100 p-6 sm:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl">فرم استعلام</h2>
            <p className="text-sm leading-[1.7] text-ink-500">
              نام و شماره خود را وارد کنید تا کارشناسان ما با شما هماهنگ کنند.
            </p>
          </div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
