import { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import CollectionPills from '@/components/CollectionPills';
import InquiryForm from '@/components/InquiryForm';
import Modal from '@/components/Modal';
import StatusPanel from '@/components/StatusPanel';
import StoneCard from '@/components/StoneCard';
import StoneImageGallery from '@/components/StoneImageGallery';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getNeighbourCollections, getRelatedStones } from '@/lib/catalog';
import { normalizeDigits } from '@/lib/format';
import { fetchCatalog } from '@/lib/stones';
import { CATEGORY_LABELS } from '@/lib/stoneLabels';
import { whatsappLink } from '@/lib/siteConfig';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/styles';
import type { Stone } from '@/types/stone';

interface StoneDetailPageProps {
  code: string;
}

function SpecRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <dt className="text-sm text-charcoal-200">{label}</dt>
      <dd className="text-sm text-cream-50">{value ? normalizeDigits(value) : 'ثبت نشده'}</dd>
    </div>
  );
}

interface StoneDetailProps {
  stone: Stone;
  stones: Stone[];
}

function StoneDetail({ stone, stones }: StoneDetailProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const isSold = stone.availability === 'sold';
  const whatsappMessage = `سلام، درباره سنگ ${stone.name} (کد ${stone.code}) استعلام دارم.`;
  const relatedStones = getRelatedStones(stone, stones);
  const relatedCollections = getNeighbourCollections(
    stone.collections.map((item) => item.id),
    relatedStones,
  );

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
        <a href="#/gallery" className="mb-10 inline-flex items-center gap-2 text-sm text-bronze-400 transition hover:text-bronze-300">
          بازگشت به گالری
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </a>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <StoneImageGallery images={stone.images} alt={stone.name} />
          </div>

          <div className="animate-fade-up flex flex-col gap-8" style={{ animationDelay: '150ms' }}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <AvailabilityBadge availability={stone.availability} />
                <span className="text-sm text-bronze-300">{CATEGORY_LABELS[stone.category]}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl">{stone.name}</h1>
              <p className="text-sm text-charcoal-200">
                کد قطعه: <span dir="ltr" className="text-cream-100">{stone.code}</span>
              </p>
              <p className="text-base leading-[1.5] text-charcoal-100">{stone.description}</p>
            </div>

            {stone.collections.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs text-charcoal-200">در دسته‌های</span>
                <CollectionPills collections={stone.collections} />
              </div>
            )}

            <dl className="divide-y divide-charcoal-700 rounded-3xl border border-charcoal-700 bg-charcoal-900/60 px-6">
              <SpecRow label="نوع سنگ" value={stone.stone_type} />
              <SpecRow label="رنگ" value={stone.color} />
              <SpecRow label="وزن" value={stone.weight} />
              <SpecRow label="ابعاد" value={stone.dimensions} />
              <SpecRow label="منشأ" value={stone.origin} />
              <SpecRow label="گواهی اصالت" value={stone.has_certificate ? 'دارد' : 'ندارد'} />
            </dl>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={() => setInquiryOpen(true)} className={`${BUTTON_PRIMARY} flex-1`}>
                {isSold ? 'استعلام قطعه مشابه' : 'استعلام این سنگ'}
              </button>
              <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={`${BUTTON_SECONDARY} flex-1`}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                پیام در واتساپ
              </a>
            </div>
          </div>
        </div>
      </div>

      {relatedStones.length > 0 && (
        <section className="border-t border-charcoal-800 bg-charcoal-900/40">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="mb-12 flex flex-col gap-2">
              <p className="text-sm text-bronze-300">قطعات مرتبط</p>
              <h2 className="text-3xl sm:text-4xl">اگر این سنگ را دوست دارید</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedStones.map((related, index) => (
                <StoneCard key={related.id} stone={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedCollections.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-bronze-300">دسته‌بندی‌های مرتبط</p>
              <h2 className="text-2xl sm:text-3xl">ادامه گشت‌وگذار</h2>
            </div>
            <CollectionPills collections={relatedCollections} />
          </div>
        </section>
      )}

      <Modal open={inquiryOpen} title={`استعلام ${stone.name}`} onClose={() => setInquiryOpen(false)}>
        <InquiryForm
          stoneId={stone.id}
          stoneCode={stone.code}
          defaultMessage={`درخواست استعلام برای ${stone.name} (کد ${stone.code})`}
        />
      </Modal>
    </div>
  );
}

export default function StoneDetailPage({ code }: StoneDetailPageProps) {
  const { state, retry } = useAsyncData(fetchCatalog, []);

  if (state.status === 'loading') {
    return (
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2" aria-busy="true">
        <div className="aspect-[4/3] animate-pulse rounded-3xl bg-charcoal-800" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-1/3 animate-pulse rounded-full bg-charcoal-800" />
          <div className="h-12 w-2/3 animate-pulse rounded-full bg-charcoal-800" />
          <div className="h-32 animate-pulse rounded-3xl bg-charcoal-800" />
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <StatusPanel title="بارگذاری این قطعه انجام نشد" description="اتصال برقرار نشد. لطفاً دوباره تلاش کنید.">
          <button type="button" onClick={retry} className={BUTTON_SECONDARY}>
            تلاش دوباره
          </button>
          <a href="#/gallery" className={BUTTON_SECONDARY}>
            بازگشت به گالری
          </a>
        </StatusPanel>
      </div>
    );
  }

  const stone = state.data.stones.find((item) => item.code === code);
  if (!stone) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <StatusPanel title="این قطعه پیدا نشد" description="ممکن است نشانی اشتباه باشد یا قطعه دیگر در گالری نمایش داده نشود.">
          <a href="#/gallery" className={BUTTON_PRIMARY}>
            مشاهده گالری
          </a>
        </StatusPanel>
      </div>
    );
  }

  return <StoneDetail stone={stone} stones={state.data.stones} />;
}
