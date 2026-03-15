from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Vexel AI Service",
    description="Microservice for handling AI, Agents, and Machine Learning Lab for Vexel One",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Vexel AI Service is online", "status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "ok", "service": "vexel-ai"}

# To be implemented: 
from app.api import assistant, agents, office, surveillance, swarm, sentient_api, twin_sandbox, instinct, expansion
app.include_router(assistant.router, prefix="/api/v1/assistant", tags=["assistant"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["agents"])
app.include_router(office.router, prefix="/api/v1/office", tags=["office"])
app.include_router(surveillance.router, prefix="/api/v1/security", tags=["security"])
app.include_router(swarm.router, prefix="/api/v1/swarm", tags=["swarm"])
app.include_router(sentient_api.router, prefix="/api/v1/agents", tags=["sentient"])
app.include_router(twin_sandbox.router, prefix="/api/v1/sandbox", tags=["sandbox"])
app.include_router(instinct.router, prefix="/api/v1/instinct", tags=["instinct"])
app.include_router(expansion.router, prefix="/api/v1/expansion", tags=["expansion"])
# app.include_router(ml_lab.router, prefix="/api/v1/ml-lab", tags=["ml-lab"])

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
