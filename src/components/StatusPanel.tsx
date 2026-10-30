import type { ReactNode } from 'react';

interface StatusPanelProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function StatusPanel({ title, description, children }: StatusPanelProps) {
  return (
    <div className="animate-fade-up flex flex-col items-center gap-4 rounded-3xl border border-dashed border-charcoal-600 bg-charcoal-900/50 px-6 py-16 text-center">
      <h2 className="text-xl text-cream-50">{title}</h2>
      <p className="max-w-md text-sm leading-[1.5] text-charcoal-100">{description}</p>
      {children && <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
