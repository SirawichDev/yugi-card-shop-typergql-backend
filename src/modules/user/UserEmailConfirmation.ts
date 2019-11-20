import { Mutation, Arg, Resolver } from "type-graphql";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import { userEmailConfirmationPrefix } from "../constants/redisPrefixes";

@Resolver()
export class UserEmailConfirmationResolver {
    @Mutation(() => Boolean)
    async userEmailConfirmation(@Arg("token") token: string): Promise<boolean> {
        const userId = await redis.get( userEmailConfirmationPrefix +token)

        if (!userId) {
            return false
        }
        await User.update({ id: parseInt(userId, 10) }, { isEmailConfirmed: true })
        redis.del(token)
        return true
    }
}