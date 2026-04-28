import prisma from "./prisma";

export async function saveMessage(
    sessionId: string,
    role: string,
    content: string
) {
    const result = await prisma.conversation.create({
        data: {
            sessionId,
            role,
            content,
        }
    })

    return result
}


export async function getHistory(
    sessionId: string,
    limit: number = 10
) {


    const result = await prisma.conversation.findMany({
        where: { sessionId: sessionId },
        orderBy: { createdAt: "asc" },
        take: limit
    });

    return result




}