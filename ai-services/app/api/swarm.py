from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
from app.core.config import settings

router = APIRouter()

class SwarmTaskRequest(BaseModel):
    taskId: str
    organizationId: str
    goal: str
    agents: List[dict] # { name: string, role: string }

async def execute_swarm_task(task_id: str, org_id: str, goal: str, agents_config: list):
    """
    Background worker orchestrating the Swarm.
    Agents iterate on the response in a semantic layer before finalized.
    """
    genai.configure(api_key=settings.GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    print(f"🚀 Spawning Swarm for Task: {task_id}")
    
    # Mocking Swarm Iteration (in reality, each agent is an instantiated LangChain agent)
    research_prompt = f"You are the Researcher. Gather key facts to achieve: {goal}"
    research_res = model.generate_content(research_prompt).text
    
    draft_prompt = f"You are the Writer. Using this research: {research_res}, draft the execution for: {goal}"
    draft_res = model.generate_content(draft_prompt).text
    
    critic_prompt = f"You are the Critic. Review this draft: {draft_res}. Check for brand safety, logic, and optimize it. Output only the final perfected version."
    final_res = model.generate_content(critic_prompt).text
    
    print(f"🏁 Swarm Completed Task: {task_id}")
    
    # Here we would hit the backend webhook to save the result and notify the user
    # e.g., requests.post(".../api/v1/workspaces/task-complete", data={"taskId": task_id, "result": final_res})
    
@router.post("/execute-swarm")
async def execute_swarm(request: SwarmTaskRequest, background_tasks: BackgroundTasks):
    """ Spawns an Autonomous Swarm to work on a heavy task in the background """
    background_tasks.add_task(
        execute_swarm_task, 
        request.taskId, 
        request.organizationId, 
        request.goal, 
        request.agents
    )
    return {"status": "Swarm deployed. Proceeding iteratively.", "taskId": request.taskId}
