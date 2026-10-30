import type { StoneCollection } from '@/types/stone';

interface CollectionPillsProps {
  collections: StoneCollection[];
}

export default function CollectionPills({ collections }: CollectionPillsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {collections.map((collection) => (
        <li key={collection.id}>
          <a
            href={`#/category/${collection.slug}`}
            className="inline-flex items-center rounded-full border border-bronze-500/50 px-4 py-1.5 text-sm text-bronze-300 transition duration-300 hover:border-bronze-400 hover:bg-bronze-500/10 hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-300"
          >
            {collection.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
