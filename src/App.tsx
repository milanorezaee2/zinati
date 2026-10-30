import { useEffect } from 'react';
import AboutPage from '@/pages/AboutPage';
import CategoryPage from '@/pages/CategoryPage';
import ContactPage from '@/pages/ContactPage';
import GalleryPage from '@/pages/GalleryPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import StoneDetailPage from '@/pages/StoneDetailPage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
  const activeSection = route.path.split('/').filter(Boolean)[0] ?? '';
  const pageKey = `${route.path}?${route.params.toString()}`;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageKey]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeSection={activeSection} />
      <main className="flex-1">
        <div key={pageKey}>
          {renderPage(route)}
        </div>
      </main>
      <Footer />
    </div>
  );
}
