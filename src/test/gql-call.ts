import { graphql, GraphQLSchema } from 'graphql'
import { buildSchemas } from '../utils/buildSchema'
import Maybe from 'graphql/tsutils/Maybe'


interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>
    userId?:number;
}
let schema: GraphQLSchema
export const gqlCall = async ({ source, variableValues,userId }: Options) => {
    if(!schema){
        schema= await buildSchemas()
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req:{
                session:{
                    userId
                }
            },
            res:{
                clearCookie: jest.fn()
            }
        }
    })
}