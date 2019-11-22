import { graphql, GraphQLSchema } from 'graphql'
import { buildSchemas } from '../utils/buildSchema'
import Maybe from 'graphql/tsutils/Maybe'


interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>
}
let schema: GraphQLSchema
export const gqlCall = async ({ source, variableValues }: Options) => {
    if(!schema){
        schema= await buildSchemas()
    }
    return graphql({
        schema,
        source,
        variableValues
    })
}