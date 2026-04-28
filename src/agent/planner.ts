import { callLLM } from "../services/llm";
import { toolsSchemas } from "../tools/schemas";


export const planner = async (messages: any[]) => {

    const res = await callLLM(messages, toolsSchemas);
    return res.choices[0]
};