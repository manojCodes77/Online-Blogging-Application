import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge"; // Use the Edge version of Prisma Client
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@manojcodes77/medium-common";
import { Resend } from "resend";

// sending otp
export const sendOtp = async (c: Context) => {
    try {
        const body = await c.req.json();
        if (!body.email) {
            return c.json({ message: "Email is required" }, 400);
        }

        const { email } = body;
        const resend = new Resend(c.env.RESEND_API_KEY);

        // generating a random 6 digit number
        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

        const data = await resend.emails.send({
            from: c.env.RESEND_EMAIL_ADDRESS,
            to: email,
            subject: "Welcome to Indian Coders Community",
            text: "Hello Brother, Welcome to ManojCodes77, Your OTP is " + otp
        });

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const existingOtp = await prisma.otp.findFirst({
            where: { email: email },
        });

        if (existingOtp) {
            if (existingOtp.attempts <= 0) {
                return c.json({ message: "Maximum attempts reached, now you can signup after 24 hours" }, 429);
            }
            await prisma.otp.update({
                where: { email: email },
                data: {
                    otp,
                    attempts: existingOtp.attempts - 1,
                    createdAt: new Date(),
                },
            });
        } else {
            await prisma.otp.create({
                data: {
                    email,
                    otp,
                    attempts: 3, // Set initial attempts
                },
            });
        }

        return c.json({ message: `Email sent successfully to ${email}`, data });
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        return c.json({ message: "Failed to send OTP" }, 500);
    }
};

export const signup = async (c: Context) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        return c.json({ message: "Invalid input" }, 400);
    }    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    // verify otp from the database
    const otp = await prisma.otp.findFirst({
        where: {
            email: body.email,
            otp: body.otp,
        },
    });

    if (!otp) {
        return c.json({ message: "Invalid OTP" }, 401);
    }

    if(new Date().getTime() - otp.createdAt.getTime() > 600000) {
        return c.json({ message: "OTP expired" }, 401);
    }

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

export const signin = async (c: Context) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        return c.json({ message: "Invalid input" }, 400);
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