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

export const createPoll = async (q: string, a1: string, a2: string, user_id: string) => {
    let linkedId = generateRandomString();

    await prisma.poll.create({
        data: {
            question: q,
            linkId: linkedId,
            user_id: user_id,
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

export const voteOnPoll = async (pollId: string, optionId: string, voterId: string) =>{
    const hasVoted = await prisma.vote.findMany({
        where: {
            pollId: pollId,
            voterId: voterId
        }
    })

    if( hasVoted.length > 0 ) return { result: "You have already voted!", alertType: "error" }

    try{
        await prisma.vote.create({
            data: {
                pollId: pollId,
                optionId: optionId,
                voterId: voterId
            }
        })

        let result = "Voted!";
        let alertType = "success";

        return {
            result: result,
            alertType: alertType
        }
    }
    catch (error) {
        return {
            result: error
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

export const getMyPolls = async (user_id: string) => {
    const polls = await prisma.poll.findMany({
        where: {
            user_id: user_id
        },
        include: {
            options: true,
            votes: true
        }
    })

    return {
        polls: polls
    }
}

export const removePoll = async (pollId: string) => {
    await prisma.vote.deleteMany({
        where: {
            pollId: pollId
        }
    })

    await prisma.option.deleteMany({
        where: {
            pollId: pollId
        }
    })

    await prisma.poll.delete({
        where: { 
            id: pollId 
        },
    });
}
