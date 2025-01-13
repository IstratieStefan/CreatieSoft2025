// testCommunication.mjs
import { getBotResponse } from './communication.mjs';

async function test() {
    const userMessage = 'What is the optimal temperature for cactus?';
    const response = await getBotResponse(userMessage);
    console.log('Bot response:', response);
}

test();