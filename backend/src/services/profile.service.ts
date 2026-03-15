import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export class CognitiveProfileService {

    /**
     * Transforms raw system data based on the user's cognitive profile preferences.
     * e.g., turning a 50-page complex report object into a bulleted executive summary natively.
     */
    static async transformDataForUser(userId: string, rawInformation: any, context: string) {
        const profile = await prisma.userCognitiveProfile.findUnique({
            where: { userId }
        });

        if (!profile) {
            // Default to returning RAW data if no cognitive profile exists
            return rawInformation;
        }

        const { preferredDensity, learningStyle } = profile;

        // If the data is already simple or user prefers high detail textual data, skip AI call
        if (preferredDensity === 'HIGH_DETAIL' && learningStyle === 'TEXT') {
            return rawInformation;
        }

        // Pass rules down to AI parsing layer to structurally alter the data payload
        console.log(`[Cognitive Transform] Adapting data density for User ${userId}. Density: ${preferredDensity}`);

        try {
            const specializedResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/agents/execute`, {
                agentId: "system-cognitive-parser",
                task: `Transform the following data payload so that it aligns strictly with a density preference of ${preferredDensity} and a presentation style of ${learningStyle}. Context: ${context}. Payload: ${JSON.stringify(rawInformation)}`
            });
            return specializedResponse.data.result;

        } catch (e) {
            console.error("[Cognitive Transform] Failed, falling back to raw payload.", e);
            return rawInformation;
        }
    }

    // Set Profile API logic
    static async upsertProfile(userId: string, density: string, style: string) {
        return await prisma.userCognitiveProfile.upsert({
            where: { userId },
            create: { userId, preferredDensity: density, learningStyle: style },
            update: { preferredDensity: density, learningStyle: style }
        });
    }
}
