import { ArrowUpLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export default function Footer() {
  const year = new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(new Date().getFullYear());
  return (
    <footer className="border-t border-charcoal-700 bg-[#eaf0e9] px-6 py-12 sm:px-12 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 text-center">
        <p className="max-w-md text-sm leading-8 text-charcoal-200">جایی برای تماشای زیبایی، رنگ و روایت‌هایی که در دل طبیعت شکل گرفته‌اند.</p>
        <a href="#/contact" className="inline-flex items-center gap-3 rounded-xl border border-bronze-400/40 px-4 py-3 text-sm text-bronze-300 transition hover:bg-bronze-400/10">ارتباط با گالری <ArrowUpLeft size={15} aria-hidden="true" /></a>
        <p className="pt-3 text-xs text-charcoal-300">© {year} {SITE_CONFIG.brandName}، تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
