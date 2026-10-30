import type { StoneAvailability, StoneCategory } from '@/types/stone';

export const CATEGORY_LABELS: Record<StoneCategory, string> = {
  precious: 'سنگ‌های قیمتی',
  decorative: 'سنگ‌های دکوراتیو',
  collectible: 'سنگ‌های کلکسیونی',
};

export const AVAILABILITY_LABELS: Record<StoneAvailability, string> = {
  available: 'موجود',
  limited: 'موجودی محدود',
  sold: 'فروخته شده',
};
