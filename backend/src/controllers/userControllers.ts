import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge"; // Use the Edge version of Prisma Client
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@manojcodes77/medium-common";

export const signup= async (c :Context) => {
    const body = await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        return c.json({message:"Invalid input"},400);
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        const jwt = await sign(
            {
                id: user.id,
            },
            c.env.JWT_SECRET
        );

        return c.json({ message: "User signed up", jwt });
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        return c.json({ message: "User already exists" }, 411);
    }
}

export const signin=  async (c:Context) => {
    const body = await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        return c.json({message:"Invalid input"},400);
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!user) {
            return c.json({ message: "Invalid credentials" }, 401);
        }

        const jwt = await sign(
            {
                id: user.id,
            },
            c.env.JWT_SECRET
        );

        return c.json({ message: "User signed in", jwt });
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        return c.json({ message: "User already exists" }, 411);
    }
}