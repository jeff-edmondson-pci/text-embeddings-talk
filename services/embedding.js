import ollama from 'ollama';

export async function getEmbedding(text) {
  const res = await ollama.embeddings({
    model: 'nomic-embed-text',
    prompt: text,
  });

  return res.embedding;
}
