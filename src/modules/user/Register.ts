
import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { RegisterParams } from './register/RegisterParams';
import { isAuth } from '../middlewares/isAuth';
import { Logger } from '../middlewares/showLog';
import { Mailer } from '../utils/mailer/node-mailer';
import { createConfirmationUrl } from '../utils/mailer/createConfirmation';
@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth, Logger)
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg('data') { firstName, lastName, email, deck, password }: RegisterParams,
    ): Promise<User> { //type return check
        const encryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            deckName: deck,
            password: encryptPassword
        }).save()
        console.log(user)
        await Mailer(email, await createConfirmationUrl(user.id))
        return user
    }
}