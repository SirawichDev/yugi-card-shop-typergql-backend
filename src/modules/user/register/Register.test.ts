import { User } from './../../../entity/User';
import { Connection } from 'typeorm'
import { connectionTest } from '../../../test/connectionTest'
import { gqlCall } from '../../../test/gql-call'
import faker from 'faker';
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
        deck
    }
}
`

describe('Register', () => {
    it('create user', async () => {
        const user = {
            firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
        }
        
           const res =  await gqlCall({
                source: registerMutation,
                variableValues: {
                    data: user
                }
            });

            expect(res).toMatchObject({
                data: {
                   register: { firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    deck: 'dont have yet'}

                }
            })

            const dbUser = await User.findOne({where: {email: user.email}})
            expect(dbUser).toBeDefined()
            expect(dbUser!.isEmailConfirmed).toBeFalsy()
            expect(dbUser!.firstName).toBe(user.firstName)
    })
})