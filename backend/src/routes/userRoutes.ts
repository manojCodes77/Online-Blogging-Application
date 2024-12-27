import { Hono } from "hono";
import {  sendOtp, signin, signup } from "../controllers/userControllers";

interface Env {
    DATABASE_URL: string,
    JWT_SECRET: string
}

const userRouter = new Hono<{
    Bindings: Env
}>();

userRouter.post("/send-otp", sendOtp);

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

export default userRouter;