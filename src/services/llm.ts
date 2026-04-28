import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.GITHUB_TOKEN,
})

export const callLLM = async (messages: any[], tools: any[]) => {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        tools
    });
    return res
};