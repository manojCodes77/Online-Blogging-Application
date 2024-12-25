import { Hono } from 'hono'
import userRouter from './routes/userRoutes'
import postRouter from './routes/postRoutes'
import { cors } from "hono/cors";

interface Env {
  DATABASE_URL: string,
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Env }>();

app.use(
  cors({
    origin: "https://manojcodes77.github.io/online-blogging-app-deploy/",
    allowMethods: ["GET", "POST","PUT","DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.route("api/v1/user/",userRouter)

app.route("api/v1/post/",postRouter)


export default app