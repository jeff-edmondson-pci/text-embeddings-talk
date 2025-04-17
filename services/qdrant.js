import { QdrantClient } from '@qdrant/js-client-rest';
import { getEmbedding } from './embedding.js';

export const COLLECTION_NAME = 'account_matcher';

export const qdrant = new QdrantClient({ url: 'http://localhost:6333' });

export async function initQdrant(vectorSize = 768) {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: vectorSize,
        distance: 'Cosine',
      },
    });
  }
}

export async function insertAccounts(accounts) {
  const points = await Promise.all(
    accounts.map(async (acc, idx) => {
      const vector = await getEmbedding(acc.accountDescription);
      return {
        id: idx,
        vector,
        payload: acc,
      };
    }),
  );

  await qdrant.upsert(COLLECTION_NAME, { points });
}

export async function searchMatch(vector) {
  const result = await qdrant.search(COLLECTION_NAME, {
    vector,
    limit: 1,
  });

  return result.map(r => r.payload);
}
