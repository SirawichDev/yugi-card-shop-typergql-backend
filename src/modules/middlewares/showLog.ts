import { MiddlewareFn } from "type-graphql";
import { Context } from "../../types/Context";

export const Logger: MiddlewareFn<Context> = async ({ args }, next) => {
    console.log('x',args)
    return next()
}