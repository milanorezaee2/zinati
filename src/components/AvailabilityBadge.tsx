import type { StoneAvailability } from '@/types/stone';
import { AVAILABILITY_LABELS } from '@/lib/stoneLabels';

const BADGE_STYLES: Record<StoneAvailability, string> = {
  available: 'border-sage-400/50 bg-charcoal-950/80 text-sage-300',
  limited: 'border-bronze-400/60 bg-charcoal-950/80 text-bronze-300',
  sold: 'border-rose-400/60 bg-charcoal-950/80 text-rose-300',
};

interface AvailabilityBadgeProps {
  availability: StoneAvailability;
}

export default function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-sm ${BADGE_STYLES[availability]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {AVAILABILITY_LABELS[availability]}
    </span>
  );
}
