import { Connection } from 'typeorm'
import { connectionTest } from '../../../test/connectionTest'
import { gqlCall } from '../../../test/gql-call'
let conn: Connection;
beforeAll(async () => {
    conn = await connectionTest();
})
afterAll(async () => {
    await conn.close()
})
const registerMutation = `
mutation Register($params: RegisterParams!){
    register(params: $params){
        id
        firstName
        lastName
        email
        deckName
    }
}
`

describe('Register', () => {
    it('create user', async () => {
        console.log(
            await gqlCall({
                source: registerMutation,
                variableValues: {
                    params: {
                        firstName: "admin",
                        lastName: "admin",
                        email: "ioioi@x.com",
                        password: "1w2e3r4t5y",
                        deck: "Destiny-Hero"
                    }
                }
            }))
    })
})