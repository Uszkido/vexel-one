# Vexel One

Vexel One is a next-generation AI operating system and multi-tenant SaaS platform built by **Vexel Innovations**.

## Features
- **AI Assistant**: Unified chat interface with OpenAI and Gemini support.
- **AI Agents**: Autonomous agents for task planning and execution.
- **Workflows**: Visual automation engine (In Progress).
- **Marketplace**: Platform for sharing and monetizing AI tools.
- **Dev Ecosystem**: API keys, identity management, and workspace isolation.

## Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS.
- **Backend**: Node.js, Express, Prisma (PostgreSQL).
- **AI Service**: Python, FastAPI, Gemini/OpenAI SDKs.
- **Infra**: Docker, Redis, Weaviate.

## Getting Started

### 1. Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.10+

### 2. Configure Environment
Create a `.env` file in the root directory (refer to `.env.example`).
```bash
cp .env.example .env
```

### 3. Start with Docker
```bash
docker-compose up --build
```

### 4. Local Development
**Backend:**
```bash
cd backend
npm install
npm run dev
```

**AI Service:**
```bash
cd ai-services
pip install -r requirements.txt
python -m app.main
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Architecture
See [architecture.md](C:\Users\COMPUTER 13\.gemini\antigravity\brain\7812382d-2e83-4bb2-a0f6-0420ae1435d1\architecture.md) for detailed system design.
