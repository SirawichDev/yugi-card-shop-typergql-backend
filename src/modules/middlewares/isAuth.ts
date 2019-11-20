
import { Context } from '../../types/Context'
import { MiddlewareFn } from 'type-graphql'

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error("please Authenticate first")
    }
    return next()
} 