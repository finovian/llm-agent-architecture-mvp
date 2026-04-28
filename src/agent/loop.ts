import { planner } from "./planner";
import { executeTool } from "./executor";
import { cp } from "node:fs";

export const runToolAgent = async (userMessage: string) => {
    const messages: any[] = [
        {
            role: "system",
            content: "You are a tool-using assistant. Use tools when needed."
        },
        {
            role: "user",
            content: userMessage
        }
    ];

    let steps = 0;
    const MAX_STEPS = 5;
    console.log('steps out', steps)
    while (steps < MAX_STEPS) {
        steps++;
        console.log('steps inner', steps)
        const response = await planner(messages);
        messages.push(response?.message);
        console.log(' response.message.content', response.message.content)
        console.log(' response.message.content', response?.message.tool_calls)


        if (response.finish_reason == 'stop' || !response.message.tool_calls) {
            return response.message.content;
        }
        console.log('response', response)

        for (const call of response.message.tool_calls) {
            console.log('call', call)
            try {
                console.log('response.message.tool_calls', response.message.tool_calls)
                const result = await executeTool(call);
                console.log('executeTool', result)

                messages.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: JSON.stringify(result)
                });

            } catch (err: any) {
                messages.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: JSON.stringify({ error: err.message })
                });
            }
        }
    }


};