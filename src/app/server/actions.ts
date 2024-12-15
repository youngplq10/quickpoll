"use server"

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const generateRandomString = (): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const createPoll = async (q: string, a1: string, a2: string) => {
    let linkedId = generateRandomString();


    await prisma.poll.create({
        data: {
            question: q,
            linkId: linkedId,
            options: {
                create: [
                    { text: a1 },
                    { text: a2 }
                ]
            }
        }
    })

    redirect("http://localhost:3000/poll/"+linkedId);
}

export const getPollData = async (pollId: string) => {
    const pollData = await prisma.poll.findFirst({
        where: {
            linkId: pollId
        },
        include: {
            options: true,
            votes: true
        }
    })

    return {
        poll: pollData
    }
}

