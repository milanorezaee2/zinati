import { useEffect } from 'react';
import AboutPage from '@/pages/AboutPage';
import CategoryPage from '@/pages/CategoryPage';
import ContactPage from '@/pages/ContactPage';
import GalleryPage from '@/pages/GalleryPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import StoneDetailPage from '@/pages/StoneDetailPage';
import Footer from '@/components/Footer';
import { Gem } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';
import CategorySidebar from '@/components/CategorySidebar';
import { useHashRoute, type HashRoute } from '@/hooks/useHashRoute';

function renderPage({ path, params }: HashRoute) {
  const [section, value] = path.split('/').filter(Boolean);

  switch (section) {
    case undefined:
      return <HomePage />;
    case 'gallery':
      return <GalleryPage initialCategory={params.get('category')} initialCollection={params.get('collection')} />;
    case 'category':
      return value ? <CategoryPage slug={value} /> : <NotFoundPage />;
    case 'stone':
      return value ? <StoneDetailPage code={value} /> : <NotFoundPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const route = useHashRoute();
  const [activeSection = '', routeValue] = route.path.split('/').filter(Boolean);
  const showCategorySidebar = ['gallery', 'category', 'stone'].includes(activeSection);
  const pageKey = `${route.path}?${route.params.toString()}`;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageKey]);

  return (
    <div className="flex min-h-screen flex-col">
      {activeSection !== '' && <div className="flex justify-center px-6 py-8 sm:py-10">
        <a href="#/" aria-label="گوهرآرا، صفحه اصلی" className="group inline-flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bronze-400/40 bg-bronze-400/10 text-bronze-300 transition group-hover:bg-bronze-400/20"><Gem size={26} strokeWidth={1.5} aria-hidden="true" /></span>
          <span className="font-display text-2xl font-bold leading-none text-cream-50">{SITE_CONFIG.brandName}</span>
          <span className="text-[10px] tracking-[.22em] text-charcoal-300" dir="ltr">STONE GALLERY</span>
        </a>
      </div>}
      <main className="flex-1">
        {showCategorySidebar ? (
          <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6 lg:px-8 lg:py-8 xl:grid-cols-[280px_minmax(0,1fr)]">
            <CategorySidebar activeSlug={activeSection === 'category' ? routeValue : undefined} isGallery={activeSection === 'gallery'} />
            <div key={pageKey} className="min-w-0 animate-fade-up lg:overflow-hidden lg:rounded-[1.75rem]">{renderPage(route)}</div>
          </div>
        ) : (
          <div key={pageKey} className="animate-fade-up">{renderPage(route)}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
