import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from 'bcryptjs'
import { redis } from "../../redis";
import { ChangePasswordParams } from "./changePasswordParams/ChangePasswordParams";
import { userForgetPasswordPrefix } from "../constants/redisPrefixes";
import { Context } from "../../types/Context";

@Resolver()

export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(@Arg("data") { token, password }: ChangePasswordParams, @Ctx() ctx: Context): Promise<User | null> {
        const userId = await redis.get(userForgetPasswordPrefix + token)
        if (!userId) {
            return null
        }
        const user = await User.findOne(userId)
        if (!user) {
            return null
        }
        await redis.del(userForgetPasswordPrefix + token)
        user.password = await bcrypt.hash(password, 10)

        await user.save();
        ctx.req.session!.userId = user.id
        return user
    }
}