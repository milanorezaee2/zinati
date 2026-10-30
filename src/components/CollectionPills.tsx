import type { StoneCollection } from '@/types/stone';

interface CollectionPillsProps {
  collections: StoneCollection[];
}

export default function CollectionPills({ collections }: CollectionPillsProps) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {collections.map((collection) => (
        <li key={collection.id}>
          <a
            href={`#/category/${collection.slug}`}
            className="inline-flex items-center rounded-full border border-ink-300/60 bg-ivory-50 px-5 py-2.5 text-sm text-ink-700 transition duration-400 hover:border-gold-400 hover:bg-gold-200/30 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {collection.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
