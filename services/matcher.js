import { getEmbedding } from './embedding.js';
import { searchMatch } from './qdrant.js';

export async function matchTransaction(tx) {
  const text = `${tx.transactionDescription} - ${tx.transactionMerchant}`;
  const vector = await getEmbedding(text);
  const [match] = await searchMatch(vector);
  return match;
}
