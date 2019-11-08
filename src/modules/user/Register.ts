
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { RegisterParams } from './register/RegisterParams';

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg('params') { firstName, lastName, email, deck, password }: RegisterParams,
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