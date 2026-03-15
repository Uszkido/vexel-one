import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

/**
 * Automaton Trigger Manager
 * Takes an Event (e.g. Email received, Sensor trip) and evaluates it against
 * the Organization's defined automation graphs.
 */
export class WorkflowEngine {

    static async triggerEvent(organizationId: string, eventType: string, payload: any) {
        // 1. Fetch active workflows for this Organization listening to `eventType`
        const workflows = await prisma.workflow.findMany({
            where: {
                organizationId: organizationId, // Assuming Workflow model got updated with orgId
                active: true,
            }
        });

        for (let wf of workflows) {
            const def = wf.definition as any;
            if (def.trigger === eventType) {
                await this.executeGraph(organizationId, def.steps, payload);
            }
        }
    }

    static async executeGraph(orgId: string, steps: any[], initialPayload: any) {
        let currentPayload = { ...initialPayload };

        for (let step of steps) {
            try {
                switch (step.action) {
                    case 'AI_SUMMARIZE':
                        const summary = await this.callAI(orgId, 'summarize', currentPayload);
                        currentPayload.summary = summary;
                        break;

                    case 'CREATE_TASK':
                        // Logic to create a project task in Vexel Office module
                        break;

                    case 'TRIGGER_PLUGIN':
                        // Logic to trigger a purchased 3rd party Marketplace App 
                        // e.g., 'Smart Irrigation Controller' in AgTech
                        const pluginId = step.pluginId;
                        // Lookup webhooks in Plugin model and dispatch
                        break;

                    case 'SEND_NOTIFICATION':
                        console.log(`Sending alert for Org ${orgId}`);
                        break;
                }
            } catch (err) {
                console.error(`Workflow step failed: ${step.action}`, err);
                // Implement retry queue here
                break;
            }
        }
    }

    private static async callAI(orgId: string, instruction: string, payload: any) {
        // Calls the Python FastAPI Engine
        const response = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/agents/execute`, {
            agentId: "system",
            task: `${instruction} the following: ${JSON.stringify(payload)}`
        });
        return response.data.result;
    }
}
