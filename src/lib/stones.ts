import { supabase } from '@/lib/supabase';
import type { Catalog, Stone, StoneCollection } from '@/types/stone';

const STONE_COLUMNS =
  'id, code, name, category, stone_type, color, weight, dimensions, origin, availability, has_certificate, description, images, featured, sort_order, stone_categories(categories(id, slug, name, tagline, description, cover_image, sort_order))';

const COLLECTION_COLUMNS = 'id, slug, name, tagline, description, cover_image, sort_order';

interface StoneRow extends Omit<Stone, 'collections'> {
  stone_categories: { categories: StoneCollection | null }[];
}

function mapStone(row: StoneRow): Stone {
  if (!Array.isArray(row.stone_categories)) throw new Error('Unexpected stone categories response');
  const { stone_categories, ...stone } = row;
  return {
    ...stone,
    collections: stone_categories.flatMap((link) => (link.categories ? [link.categories] : [])),
  };
}

export async function fetchCatalog(): Promise<Catalog> {
  const [stonesResult, collectionsResult] = await Promise.all([
    supabase.from('stones').select(STONE_COLUMNS).order('sort_order', { ascending: true }),
    supabase.from('categories').select(COLLECTION_COLUMNS).order('sort_order', { ascending: true }),
  ]);

  if (stonesResult.error) throw new Error(stonesResult.error.message);
  if (collectionsResult.error) throw new Error(collectionsResult.error.message);
  if (!Array.isArray(stonesResult.data) || !Array.isArray(collectionsResult.data)) {
    throw new Error('Unexpected catalog response');
  }

  return {
    stones: (stonesResult.data as unknown as StoneRow[]).map(mapStone),
    collections: collectionsResult.data as StoneCollection[],
  };
}
