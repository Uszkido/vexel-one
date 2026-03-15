import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OpenAI API Key missing. AI features will fallback to simulated responses.');
}

export const openai = new OpenAI({
    apiKey: apiKey,
});
