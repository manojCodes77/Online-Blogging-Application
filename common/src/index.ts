import { z } from "zod";

export const signupInput=z.object({
    name:z.string().min(3).max(255),
    email:z.string().email(),
    password:z.string().min(6).max(255),
})

export type SignupInput=z.infer<typeof signupInput>;

export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6).max(255),
})

export type SigninInput=z.infer<typeof signinInput>;

export const createPostInput=z.object({
    title:z.string(),
    content:z.string(),
});

export type CreatePostInput=z.infer<typeof createPostInput>;

export const updatePostInput=z.object({
    id:z.string(),
    title:z.string().optional(),
    content:z.string().optional(),
})

export type UpdatePostInput=z.infer<typeof updatePostInput>;