import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "src/entity/User";
import { Context } from '../../types/Context'
@Resolver()

export class UserData {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: Context) {
        if (!ctx.req.session!.userId) {
            return null
        }
        return User.findOne(ctx.req.session!.userId)
    }
}