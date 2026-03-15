from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
from app.core.config import settings

router = APIRouter()

class DocumentQuery(BaseModel):
    query: str
    knowledgeBaseId: str
    organizationId: str

class MeetingSummaryRequest(BaseModel):
    transcript: str
    organizationId: str

@router.post("/query")
async def query_knowledge_base(request: DocumentQuery):
    if not settings.GOOGLE_API_KEY:
        raise HTTPException(status_code=400, detail="Google API Key not configured")
    
    # 1. Retrieve relevant chunks from Vector DB (Placeholder)
    context = "Internal company policy: Remote work is allowed 2 days per week. Expenses must be submitted by Friday."
    
    # 2. Augment prompt and query Gemini
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    prompt = f"Using the following company context: {context}\n\nQuestion: {request.query}\n\nProvide a professional office assistant response."
    
    try:
        response = model.generate_content(prompt)
        return {"answer": response.text, "sources": ["Company Policy v1.pdf"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarize-meeting")
async def summarize_meeting(request: MeetingSummaryRequest):
    if not settings.GOOGLE_API_KEY:
        raise HTTPException(status_code=400, detail="Google API Key not configured")
    
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"Summarize the following meeting transcript and extract action items:\n\n{request.transcript}"
    
    try:
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
