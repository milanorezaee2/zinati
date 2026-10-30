import type { ReactNode } from 'react';

interface StatusPanelProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function StatusPanel({ title, description, children }: StatusPanelProps) {
  return (
    <div className="animate-fade-up flex flex-col items-center gap-5 rounded-2xl border border-dashed border-ink-300/60 bg-ivory-100/60 px-6 py-20 text-center">
      <h2 className="text-xl text-ink-900">{title}</h2>
      <p className="max-w-md text-sm leading-[1.6] text-ink-500">{description}</p>
      {children && <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
