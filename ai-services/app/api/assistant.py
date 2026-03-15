from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import openai
import google.generativeai as genai
from app.core.config import settings

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    provider: str = "openai" # "openai", "gemini", "huggingface"
    model: Optional[str] = None
    stream: bool = False

@router.post("/chat")
async def chat(request: ChatRequest):
    if request.provider == "openai":
        return await handle_openai(request)
    elif request.provider == "gemini":
        return await handle_gemini(request)
    else:
        raise HTTPException(status_code=400, detail="Unsupported provider")

async def handle_openai(request: ChatRequest):
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=400, detail="OpenAI API Key not configured")
    
    client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    try:
        response = await client.chat.completions.create(
            model=request.model or "gpt-4o",
            messages=[{"role": m.role, "content": m.content} for m in request.messages],
        )
        return {"content": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def handle_gemini(request: ChatRequest):
    if not settings.GOOGLE_API_KEY:
        raise HTTPException(status_code=400, detail="Google API Key not configured")
    
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel(request.model or 'gemini-1.5-pro')
    
    # Convert messages to Gemini format
    history = []
    for msg in request.messages[:-1]:
        history.append({"role": "user" if msg.role == "user" else "model", "parts": [msg.content]})
    
    chat_session = model.start_chat(history=history)
    
    try:
        response = chat_session.send_message(request.messages[-1].content)
        return {"content": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
