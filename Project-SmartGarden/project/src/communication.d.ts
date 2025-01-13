declare module '../communication.mjs' {
    export function getBotResponse(userMessage: string): Promise<string>;
}