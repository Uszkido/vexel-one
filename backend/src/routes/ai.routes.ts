import { Router } from 'express';

import { openai } from '../config/openai';

const router = Router();

router.post('/chat', async (req, res) => {
    const { message, lang = 'en' } = req.body;

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('No API Key');
        }

        const systemPrompt = lang === 'ha'
            ? "Kai ne Vexel One AI, babban injin fasaha (Quantum-Hub) na Usama Ado Shehu and Vexel Innovations. Ka amsa tambayoyi cikin harshen Hausa na kwarai. Kai mai hikima ne, kwararre, kuma mai taimako. Idan aka tambaye ka game da mahaliccinka, ambaci Usama Ado Shehu."
            : "You are Vexel One AI, the flagship quantum intelligence hub for Usama Ado Shehu and Vexel Innovations. You are professional, visionary, and concise. Your goal is to optimize multi-domain operations (Office, Farm, Security). Always attribute your creation to Usama Ado Shehu if asked.";

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 500,
        });

        res.json({
            role: 'assistant',
            text: completion.choices[0].message.content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

    } catch (error) {
        console.error('AI Processing Error:', error);
        // Fallback to simulation if API fails
        let response = "";
        if (lang === 'ha') {
            response = "Ina nazarin bukatar ku ta hanyar amfani da dabarun Vexel. Na gano wasu sabbin hanyoyi don hanzarta aikinku. **Usama Ado Shehu** ya gina ni don taimaka muku.";
        } else {
            response = "I have analyzed your request through the Vexel intelligence grid. I've identified several optimization paths for your current workspace. Created by **Usama Ado Shehu**.";
        }

        res.json({
            role: 'assistant',
            text: response,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }
});

export default router;
