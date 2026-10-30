import { MapPin, Mail, MessageCircle, Phone } from 'lucide-react';
import { normalizeDigits } from '@/lib/format';
import { SITE_CONFIG, whatsappLink } from '@/lib/siteConfig';

const QUICK_LINKS = [
  { href: '#/', label: 'خانه' },
  { href: '#/gallery', label: 'گالری سنگ‌ها' },
  { href: '#/about', label: 'درباره مجموعه' },
  { href: '#/contact', label: 'تماس و بازدید' },
];

export default function Footer() {
  const currentYear = new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(new Date().getFullYear());

  return (
    <footer className="mt-24 border-t border-ink-300/40 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/60 text-sm font-bold text-gold-600">
              گ
            </span>
            <span className="text-lg font-bold tracking-tight text-ink-900">{SITE_CONFIG.brandName}</span>
          </div>
          <p className="max-w-xs text-sm leading-[1.6] text-ink-500">{SITE_CONFIG.slogan}</p>
        </div>

        <nav aria-label="پیوندهای سایت">
          <h3 className="mb-5 text-xs font-medium uppercase tracking-luxe text-gold-600">دسترسی سریع</h3>
          <ul className="flex flex-col gap-3.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ink-600 transition duration-300 hover:text-ink-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-5 text-xs font-medium uppercase tracking-luxe text-gold-600">ارتباط با ما</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-ink-600">
            <li>
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2.5 transition duration-300 hover:text-ink-900">
                <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span dir="ltr">{normalizeDigits(SITE_CONFIG.phoneDisplay)}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink('سلام، می‌خواهم درباره سنگ‌های گالری استعلام بگیرم.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition duration-300 hover:text-ink-900"
              >
                <MessageCircle className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span>واتساپ</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 transition duration-300 hover:text-ink-900">
                <Mail className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span dir="ltr">{SITE_CONFIG.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              <span>{SITE_CONFIG.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-300/30">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-ink-400 sm:px-8">
          © {currentYear} {SITE_CONFIG.brandName}. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
