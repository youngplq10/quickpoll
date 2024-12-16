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

export const voteOnPoll = async (pollId: string, optionId: string) =>{
    try{
        await prisma.vote.create({
            data: {
                pollId: pollId,
                optionId: optionId,
                voterId: "test"
            }
        })

        let result = "Voted!";

        return {
            result: result
        }
    }
    catch {
        let result = "You have already voted!";

        return {
            result: result
        }
    }
}

export const getVotes = async (pollId: string, optionAId: string, optionBId: string) => {
    const optionAResult = await prisma.vote.count({
        where: {
            pollId: pollId,
            optionId: optionAId
        }
    });

    const optionBResult = await prisma.vote.count({
        where: {
            pollId: pollId,
            optionId: optionBId
        }
    });

    return {
        optionAResult: optionAResult,
        optionBResult: optionBResult
    }
}
