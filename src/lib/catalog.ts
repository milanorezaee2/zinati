import type { Stone, StoneCollection } from '@/types/stone';

export function getCollectionStones(collection: StoneCollection, stones: Stone[]): Stone[] {
  return stones.filter((stone) => stone.collections.some((item) => item.id === collection.id));
}

export function getRelatedStones(stone: Stone, stones: Stone[], limit = 4): Stone[] {
  const ownIds = new Set(stone.collections.map((item) => item.id));
  return stones
    .filter((other) => other.id !== stone.id)
    .map((other) => ({ other, shared: other.collections.filter((item) => ownIds.has(item.id)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || a.other.sort_order - b.other.sort_order)
    .slice(0, limit)
    .map(({ other }) => other);
}

export function getNeighbourCollections(ownCollectionIds: string[], stones: Stone[]): StoneCollection[] {
  const ownIds = new Set(ownCollectionIds);
  const found = new Map<string, StoneCollection>();
  stones.forEach((stone) =>
    stone.collections.forEach((item) => {
      if (!ownIds.has(item.id)) found.set(item.id, item);
    }),
  );
  return [...found.values()].sort((a, b) => a.sort_order - b.sort_order);
}
