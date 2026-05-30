import type { Property } from "./types";

/**
 * Content-based "AI" recommender. Scores candidate properties against a
 * reference listing using weighted feature similarity:
 *   - shared tags (Jaccard-style overlap)
 *   - same city / type
 *   - price proximity (gaussian falloff)
 *   - bedroom proximity
 *
 * In production this is swapped for a vector-similarity query (pgvector
 * embeddings of listing descriptions + user behaviour signals) behind the
 * same `recommend()` signature, so the UI never changes.
 */
export function recommend(reference: Property, pool: Property[], limit = 3): Property[] {
  const refTags = new Set(reference.tags);

  const scored = pool
    .filter((p) => p.id !== reference.id && p.status !== "sold")
    .map((p) => {
      const shared = p.tags.filter((t) => refTags.has(t)).length;
      const union = new Set([...p.tags, ...reference.tags]).size || 1;
      const tagScore = shared / union; // 0..1

      const cityScore = p.city === reference.city ? 1 : 0;
      const typeScore = p.type === reference.type ? 1 : 0;

      const priceDelta = Math.abs(p.price - reference.price) / (reference.price || 1);
      const priceScore = Math.exp(-Math.pow(priceDelta, 2) * 2); // 0..1, peaks when close

      const bedScore = 1 - Math.min(Math.abs(p.beds - reference.beds) / 5, 1);

      const score =
        tagScore * 0.4 + cityScore * 0.2 + typeScore * 0.15 + priceScore * 0.15 + bedScore * 0.1;

      return { property: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.property);
}
