export interface poll{
    options: {
        id: string;
        text: string;
        pollId: string;
    }[];
    votes: {
        id: string;
        createdAt: Date;
        pollId: string;
        optionId: string;
        voterId: string;
    }[];
    id: string;
    question: string;
    linkId: string;
    createdAt: Date;
}