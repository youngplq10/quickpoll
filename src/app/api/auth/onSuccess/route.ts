import {PrismaClient} from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
    const prisma = new PrismaClient();

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id || !user.email)
        throw new Error("f creating user via prisma" + user);

    let dbUser = await prisma.user.findUnique({
        where: {
            kindeId: user.id,
            email: user.email
        }
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                kindeId: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
            }
        });
    }

    redirect("/")
}