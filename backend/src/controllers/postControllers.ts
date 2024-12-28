import { Context, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@manojcodes77/medium-common";


export const auth = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header("Authorization") || "";
        const user = await verify(authHeader, c.env.JWT_SECRET);
        c.set("authorId", user.id);
        await next();
    } catch (error) {
        // console.log(error);
        return c.json({ message: "Unauthorized" }, 401);
    }
}

export const createPost = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            return c.json({ message: "Invalid input" }, 400);
        }
        const authorId = c.get("authorId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });

        return c.json({
            message: "Post has been created",
            id: post.id
        });
    } catch (error) {
        // console.log(error);
        return c.json({
            message: "Failed to create post"
        }, 500);
    }
}

export const deletePost = async (c: Context) => {
    const id = c.req.param('id');
    const authorId = c.get("authorId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.delete({
            where: {
                id,
                authorId
            }
        });
        return c.json({
            message: "Post has been deleted",
            post
        });
    } catch (error) {
        return c.json({
            message: "Post not found"
        }, 404)
    }
}

export const deleteMyAllPosts = async (c: Context) => {
    const authorId = c.get("authorId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.deleteMany({
            where: {
                authorId
            }
        });

        return c.json({
            message: "All posts have been deleted",
            posts
        });

    } catch (error) {
        console.error("Error deleting posts:", error);
        return c.json({
            message: "Failed to delete posts"
        }, 500);
    }
}

export const updatePost = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            return c.json({ message: "Invalid input" }, 400);
        }
        const authorId = c.get("authorId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId
            },
            data: {
                title: body.title,
                content: body.content,
                createdAt: new Date()
            }
        });

        return c.json({
            message: "Post has been updated",
            post
        });
    } catch (error) {
        // console.log(error);
        return c.json({
            message: "Failed to update post"
        }, 500);
    }
}

export const getPostById = async (c: Context) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                id: true,
                published: true,
                createdAt: true
            }
        })
        return c.json({
            message: "Post has been fetched",
            post
        })
    } catch (error) {
        return c.json({
            message: "Post not found"
        }, 404)
    }
}

export const getAllPosts = async (c: Context) => {
    const authorId = c.get("authorId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            }
        });

        if (!posts || posts.length === 0) {
            return c.json({
                message: "No posts found for this author"
            }, 404);
        }

        return c.json({
            message: "Posts have been fetched",
            posts
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return c.json({
            message: "Failed to fetch posts"
        }, 500);
    }
};

export const AllPosts = async (c: Context) => {
    const authorId = c.get("authorId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            where: {
                NOT: {
                    authorId: authorId
                }
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            }
        });

        if (!posts || posts.length === 0) {
            return c.json({
                message: "No posts found for this author"
            }, 404);
        }

        return c.json({
            message: "Posts have been fetched",
            posts
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return c.json({
            message: "Failed to fetch posts"
        }, 500);
    }
};