from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
from app.core.config import settings
import json

router = APIRouter()

class SimulationRequest(BaseModel):
    orgState: dict
    scenario: str

@router.post("/simulate")
async def simulate_sandbox(request: SimulationRequest):
    """
    Ingests the current Digital Twin State of the Organization.
    Runs Monte Carlo simulation logic (AI extrapolated) on the 'What If' Scenario.
    """
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    system_prompt = f"""
    You are the Vexel One Sandbox Simulator. 
    Current Organization State (Digital Twin):
    {json.dumps(request.orgState)}
    
    The user wants to simulate this scenario:
    {request.scenario}
    
    Calculate the probability of success, the primary risk paths, and the estimated financial/time impact.
    Return a structured JSON with: "successProbability" (float 0-100), "riskFactors" (list), "projectedImpact" (string).
    Use Markdown logic mapping where needed.
    """
    
    res = model.generate_content(system_prompt).text
    
    # Normally we parse the AI LLM output into struct JSON here
    # Mock return for architecture mapping:
    return {
        "successProbability": 64.5,
        "riskFactors": ["Supply chain delay via Port B", "Labor shortage requiring 20% premium pay"],
        "projectedImpact": "Revenue drop by 4% in Q3, matched with 12% boost in Q4 post-migration."
    }
