
import { Resolver, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import * as bcrypt from 'bcryptjs'

import { User } from '../../entity/User'

@Resolver(User)
export class RegisterResolver {


    @FieldResolver() async name(@Root() parent: User) {
        return `${parent.firstName + parent.deckName}`
    }

    @Mutation(() => User)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('deck') deck: string
    ): Promise<User> { //type return check
        const encryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            deckName: deck,
            password: encryptPassword
        }).save()

        return user
    }
}