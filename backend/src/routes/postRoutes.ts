import { Hono } from "hono";
import { AllPosts, auth, createPost, deleteMyAllPosts, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postControllers";

interface Env {
    DATABASE_URL: string,
    JWT_SECRET: string
}

const postRouter = new Hono<{
    Bindings: Env
}>();

postRouter.use("/*",auth );

postRouter.post('/', createPost);

postRouter.put('/', updatePost);

postRouter.get('/AllPosts', AllPosts);

postRouter.get("/bulk", getAllPosts);

postRouter.delete('/', deleteMyAllPosts);

postRouter.delete('/delete/:id', deletePost);

postRouter.get('/:id', getPostById);


export default postRouter;