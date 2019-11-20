import { Resolver, Mutation, Arg } from "type-graphql";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import { v4 } from 'uuid'
import { Mailer } from "../utils/mailer/node-mailer";
import { userForgetPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class UserForgetPassword {
    @Mutation(() => Boolean)
    async forgetPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } })
        console.log(user)
        if (!user) {
            return true
        }
        const userToken = v4()
        await redis.set(userForgetPasswordPrefix + userToken, user.id, "expire", 60 * 60 * 24)

        await Mailer(email, `http://localhost:3000/user/forget-password/${userToken}`)
        return true
    }
}