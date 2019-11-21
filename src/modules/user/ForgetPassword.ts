import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { Mailer } from "../utils/mailer/node-mailer";
import { createChangePasswordUrl } from "../utils/mailer/createChangePasswordUrl";

@Resolver()
export class UserForgetPassword {
    @Mutation(() => Boolean)
    async forgetPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return true
        }
        await Mailer(email, await createChangePasswordUrl(user.id))
        return true
    }
}