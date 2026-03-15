import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export class SimulatorService {

    /**
     * Evaluates a "What If" scenario against the Organization's Data Twin
     * E.g. "What happens if we lose supplier XYZ for 2 weeks?"
     */
    static async executeSandboxScenario(orgId: string, scenarioText: string) {

        // 1. Load the active Digital Twin (Current Snapshot)
        let twin = await prisma.digitalTwin.findUnique({
            where: { organizationId: orgId }
        });

        if (!twin) {
            // Auto-generate twin base state (Mocking IoT / DB aggregate snapshot)
            twin = await prisma.digitalTwin.create({
                data: {
                    organizationId: orgId,
                    name: 'Main Operation Model',
                    stateData: { activeWorkers: 154, cashFlow: 'Stable', averageThroughput: 'High', currentRisks: ['Weather'] }
                }
            });
        }

        console.log(`[Simulator] Starting Sandbox Run for Scene: ${scenarioText}`);

        // passing Twin State + Scenario to Python AI layer
        const simulationResult = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/sandbox/simulate`, {
            orgState: twin.stateData,
            scenario: scenarioText
        });

        const simRecord = await prisma.simulationRun.create({
            data: {
                twinId: twin.id,
                scenario: scenarioText,
                result: simulationResult.data
            }
        });

        return simRecord;
    }
}
