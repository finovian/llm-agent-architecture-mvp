import { Request, Response } from "express";
import { getHistory, saveMessage } from "../lib/db";
import { runToolAgent } from "../agent/loop";
import { exparimentalAgent } from "../lib/tools";


export const runAgent = async (req: Request, res: Response) => {

    const { message, sessionId } = req.body

    try {

        await saveMessage(sessionId, "user", message)
        const history = await getHistory(sessionId, 10)
        console.log('history', history)

        const messageRes = await exparimentalAgent(message, history)
        await saveMessage(sessionId, "assistant", messageRes as string)

        res.status(200).json({
            message: messageRes
        })

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}