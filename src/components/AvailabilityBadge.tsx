import type { StoneAvailability } from '@/types/stone';
import { AVAILABILITY_LABELS } from '@/lib/stoneLabels';

const BADGE_STYLES: Record<StoneAvailability, string> = {
  available: 'border-sage-500/40 bg-sage-500/10 text-sage-600',
  limited: 'border-gold-500/40 bg-gold-200/40 text-gold-700',
  sold: 'border-wine-400/40 bg-wine-300/15 text-wine-600',
};

const DOT_STYLES: Record<StoneAvailability, string> = {
  available: 'bg-sage-500',
  limited: 'bg-gold-500',
  sold: 'bg-wine-400',
};

interface AvailabilityBadgeProps {
  availability: StoneAvailability;
}

export default function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm ${BADGE_STYLES[availability]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[availability]}`} aria-hidden="true" />
      {AVAILABILITY_LABELS[availability]}
    </span>
  );
}
