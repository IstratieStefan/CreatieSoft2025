// communication.mjs
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function getBotResponse(userMessage) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage },
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        return 'Sorry, I am having trouble responding right now.';
    }
}