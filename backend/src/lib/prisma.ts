import { PrismaClient } from '../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

/**
 * Create a Prisma client with Accelerate extension for Cloudflare Workers
 * @param accelerateUrl - The Prisma Accelerate connection URL
 */
export const createPrismaClient = (accelerateUrl: string) => {
    return new PrismaClient({
        accelerateUrl,
    }).$extends(withAccelerate())
}

export { PrismaClient }