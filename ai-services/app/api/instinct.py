from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
from app.core.config import settings
import json

router = APIRouter()

class TelemetryLog(BaseModel):
    orgId: str
    recentLogs: list  # Can be emails, CCTV motion events, network activity, shipping delays

@router.post("/analyze-instinct")
async def analyze_instinct(request: TelemetryLog):
    """
    Sub-Conscious Anomaly Engine (Vexel Instinct).
    Passes a large, disparate chunk of data spanning emails, sensors, and tasks,
    asking the AI to find invisible correlations.
    """
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    
    # Needs a huge context window model (Gemini 1.5 Pro allows 1-2M tokens)
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    system_prompt = f"""
    You are the "Vexel Instinct" subconscious anomaly detector.
    Review the following massive telemetry log from organization {request.orgId}.
    The log contains timestamped data from IoT sensors, email metadata, and task completion rates.
    
    Find any hidden, non-obvious correlations. For example, 'Does a specific type of machine failure correlate with a specific employee's shift?' or 'Do delayed emails from department A cause metric drops in department B?'
    
    Telemetry Data:
    {json.dumps(request.recentLogs)}
    
    If you find a high-confidence correlation (anomaly), return a JSON object with:
    "description" (string), "confidence" (0.0 to 1.0), "isActionable" (boolean).
    If nothing is found, return confidence 0.
    """
    
    # Mocking standard response structure instead of live token generation
    return {
        "status": "Instinct Analyzed",
        "correlations": [
           {
             "description": "Logistics email delays after 4 PM local time correlate heavily (88%) with Friday supply chain bottlenecks next week.",
             "confidence": 0.88,
             "isActionable": True
           }
        ]
    }
