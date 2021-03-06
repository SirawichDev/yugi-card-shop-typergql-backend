import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { createConnection } from 'typeorm'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from './redis'
import { buildSchemas } from './utils/buildSchema'

const main = async () => {
    await createConnection()
    const schema = await buildSchemas();
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req,res }: any) => ({ req,res })
    });

    const app = Express()
    const RedisStore = connectRedis(session)
    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000'
        })
    )
    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: 'yugi-o',
            secret: "asdasrjdasdas",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 4 * 365
            }
        })
    )

    apolloServer.applyMiddleware({ app })

    app.listen(3333, () => {
        console.log('start on http://localhost:3333/graphql');
    })

}

main();