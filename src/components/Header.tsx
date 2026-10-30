import { useEffect, useState } from 'react';
import { Gem, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';
import { BUTTON_PRIMARY } from '@/lib/styles';

const NAV_ITEMS = [
  { key: '', href: '#/', label: 'خانه' },
  { key: 'gallery', href: '#/gallery', label: 'گالری سنگ‌ها' },
  { key: 'about', href: '#/about', label: 'درباره مجموعه' },
  { key: 'contact', href: '#/contact', label: 'تماس و بازدید' },
];

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-charcoal-700 bg-charcoal-950/90 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'border-transparent bg-charcoal-950/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#/" className="group flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze-500/60 text-bronze-400 transition duration-500 group-hover:rotate-12 group-hover:border-bronze-300">
            <Gem className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold text-cream-50">{SITE_CONFIG.brandName}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeSection;
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm transition duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:bg-bronze-400 after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-bronze-300 after:scale-x-100'
                    : 'text-cream-200 hover:text-bronze-300 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="#/contact" className={`hidden md:inline-flex ${BUTTON_PRIMARY} px-5 py-2.5`}>
          استعلام سنگ
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-600 text-cream-100 transition hover:border-bronze-400 hover:text-bronze-300 md:hidden"
          aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="animate-fade-in border-t border-charcoal-700 bg-charcoal-950 px-5 py-4 md:hidden" aria-label="منوی موبایل">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === activeSection;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-xl px-4 py-3 text-base transition ${
                      isActive ? 'bg-bronze-500/10 text-bronze-300' : 'text-cream-100 hover:bg-charcoal-800 hover:text-bronze-300'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
