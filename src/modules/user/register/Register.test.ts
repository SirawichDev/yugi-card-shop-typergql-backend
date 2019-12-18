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
mutation Register($data: RegisterParams!){
    register(params: $data){
        id
        firstName
        lastName
        email
    }
}
`

describe('Register', () => {
    it('create user', async () => {
        console.log(
            await gqlCall({
                source: registerMutation,
                variableValues: {
                    data: {
                        firstName: "adasdminx",
                        lastName: "admasdinx",
                        email: "texsdqwxxt@x.com",
                        password: "1w2e3r4t5y",
                        deck: 'test'
                    }
                }
            }))
    })
})