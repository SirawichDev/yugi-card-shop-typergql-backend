
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import * as bcrypt from 'bcryptjs'

import { User } from '../../entity/User'

@Resolver()
export class RegisterResolver {

    @Query(() => String)
    async sayhi() {
        return "Hii eiei"
    }

    @Mutation(() => String)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<User> { //type return check
        const encryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptPassword
        }).save()

        return user
    }
}