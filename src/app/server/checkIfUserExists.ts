"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const checkIfUserExists = async () => {
    const prisma = new PrismaClient();
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = getUser();
    const isLoggedIn = await isAuthenticated();

    if(!isLoggedIn){
        redirect("/");
    }

    if (!user || user == null || !(await user).id || !(await user).email || (await user).email == null)
        throw new Error("f creating user via prisma" + user);

    const User = await prisma.user.findUnique({
        where: {
            kindeId: (await user).id,
            email: (await user).email ?? ""
        }
    });

    if(!User){
        redirect("/api/auth/success");
    }
}

export default checkIfUserExists;