export const SITE_CONFIG = {
  brandName: 'گوهرآرا',
  slogan: 'زیبایی، در دل زمین شکل می‌گیرد.',
  phoneDisplay: '+98 21 1234 5678',
  phoneHref: 'tel:+982112345678',
  whatsappNumber: '989120000000',
  email: 'info@example.com',
  address: 'تهران، خیابان نمونه، پلاک ۰۰',
  visitHours: 'شنبه تا پنجشنبه، ۱۰ تا ۱۸',
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
