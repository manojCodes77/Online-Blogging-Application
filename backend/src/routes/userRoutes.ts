import { Hono } from "hono";
import {  signin, signup } from "../controllers/userControllers";

interface Env {
    DATABASE_URL: string,
    JWT_SECRET: string
}

const userRouter = new Hono<{
    Bindings: Env
}>();

userRouter.post("/signup", signup);

userRouter.post("/signin",signin);

export default userRouter;