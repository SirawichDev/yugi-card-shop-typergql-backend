import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema, Resolver, Query } from 'type-graphql'

@Resolver()
class YugiCardResolver {
    // private yugiCardCollection: Yugi[] = [];
    @Query(() => String, { name: 'sirawich'})
    async yugi() {
        return "Welcome Yugi"
    }
}
const main = async () => {
    const schema = await buildSchema({
        resolvers: [YugiCardResolver]
    })
    const apolloServer = new ApolloServer({ schema });

    const app = Express()
    apolloServer.applyMiddleware({ app })

    app.listen(3333, () => {
        console.log('start on http://localhost:3333/graphql')
    })

}

main();