# Vector / Text Embeddings - Dev Talk

Presentation slides + example transaction categorization service

## Tech

### Vector Database

- Qdrant Vector database running locally in a Docker container
- Non Local Alternative: Qdrant, Pinecone

### Text Embedding Model

- `nomic-embed-text` model running locally with Ollama
- Non Local Alternative: Open AI: `text-embedding-3-small`

## Running Locally

### Ollama

Download and install Ollama. https://ollama.com/library/nomic-embed-text

```bash
`ollama pull nomic-embed-text`
```

### Qdrant

Have docker installed.

1. Download the docker image

```bash
docker pull qdrant/qdrant
```

2. Run the service

```bash
docker run -p 6333:6333 -p 6334:6334 \
    -v "$(pwd)/qdrant_storage:/qdrant/storage:z" \
    qdrant/qdrant
```

## Resources

- https://qdrant.tech/documentation/quickstart/
- https://ollama.com/library/nomic-embed-text
- https://ollama.com/
- https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode
- https://www.pinecone.io/learn/vector-embeddings/
- https://huggingface.co/spaces/jphwang/colorful_vectors
