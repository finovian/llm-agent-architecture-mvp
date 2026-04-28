import { toolMap } from "../tools/registry";
import { validateToolInput } from "../validators/toolValidator";

export const executeTool = async (toolCall: any) => {
    const toolName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    validateToolInput(toolName, args);

    const fn = toolMap[toolName];

    if (!fn) throw new Error("Tool not found");

    const result = await fn(...Object.values(args));

    return result;
};