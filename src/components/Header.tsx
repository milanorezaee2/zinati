import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';
import { BUTTON_GHOST } from '@/lib/styles';

const NAV_ITEMS = [
  { key: '', href: '#/', label: 'خانه' },
  { key: 'gallery', href: '#/gallery', label: 'گالری' },
  { key: 'about', href: '#/about', label: 'درباره' },
  { key: 'contact', href: '#/contact', label: 'تماس' },
];

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink-300/40 bg-ivory-50/85 shadow-sm shadow-ink-900/5 backdrop-blur-md'
          : 'border-b border-transparent bg-ivory-50/40 backdrop-blur-[2px]'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#/" className="group flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/60 text-gold-600 transition duration-500 group-hover:rotate-6 group-hover:border-gold-500">
            <span className="text-sm font-bold">گ</span>
          </span>
          <span className="text-lg font-bold tracking-tight text-ink-900">{SITE_CONFIG.brandName}</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeSection;
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm transition duration-400 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-center after:bg-gold-500 after:transition-transform after:duration-500 ${
                  isActive
                    ? 'text-ink-900 after:scale-x-100'
                    : 'text-ink-500 hover:text-ink-900 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="#/contact" className={`hidden md:inline-flex ${BUTTON_GHOST} border border-ink-300/70`}>
          استعلام سنگ
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-300/60 text-ink-700 transition hover:border-ink-900 hover:text-ink-900 md:hidden"
          aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="animate-fade-in border-t border-ink-300/30 bg-ivory-50 px-5 py-4 md:hidden" aria-label="منوی موبایل">
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
                      isActive ? 'bg-gold-200/40 text-ink-900' : 'text-ink-600 hover:bg-ivory-200 hover:text-ink-900'
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
