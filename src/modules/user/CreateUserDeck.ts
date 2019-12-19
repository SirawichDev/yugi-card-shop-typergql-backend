import { Context } from './../../types/Context';
import { Deck } from './../../entity/Deck';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'



@Resolver()
export class UserCreateDecks {

    @Mutation(() => Deck, { nullable: true })
    async createDeck(@Arg("name") name: string, @Arg("rate") rate: string, @Ctx() ctx: Context): Promise<Deck | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined
        }
        const deck = Deck.create({
            name: name,
            rate,

        })
        return deck;
    }

}