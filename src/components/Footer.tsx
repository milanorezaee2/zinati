import { Gem, MapPin, Mail, MessageCircle, Phone } from 'lucide-react';
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
    <footer className="mt-24 border-t border-charcoal-800 bg-charcoal-900">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze-500/60 text-bronze-400">
              <Gem className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold text-cream-50">{SITE_CONFIG.brandName}</span>
          </div>
          <p className="max-w-xs text-sm leading-[1.5] text-charcoal-200">{SITE_CONFIG.slogan}</p>
        </div>

        <nav aria-label="پیوندهای سایت">
          <h3 className="mb-4 text-sm text-bronze-300">دسترسی سریع</h3>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-cream-200 transition hover:text-bronze-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm text-bronze-300">ارتباط با ما</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream-200">
            <li>
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 transition hover:text-bronze-300">
                <Phone className="h-4 w-4 text-bronze-400" aria-hidden="true" />
                <span dir="ltr">{normalizeDigits(SITE_CONFIG.phoneDisplay)}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink('سلام، می‌خواهم درباره سنگ‌های گالری استعلام بگیرم.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-bronze-300"
              >
                <MessageCircle className="h-4 w-4 text-bronze-400" aria-hidden="true" />
                <span>واتساپ</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 transition hover:text-bronze-300">
                <Mail className="h-4 w-4 text-bronze-400" aria-hidden="true" />
                <span dir="ltr">{SITE_CONFIG.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" aria-hidden="true" />
              <span>{SITE_CONFIG.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-800">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-charcoal-300 sm:px-8">
          © {currentYear} {SITE_CONFIG.brandName}. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
