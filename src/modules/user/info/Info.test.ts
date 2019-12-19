import {User} from '../../../entity/User';
import {Connection} from 'typeorm'
import {connectionTest} from '../../../test/connectionTest'
import {gqlCall} from '../../../test/gql-call'
import faker from 'faker'


let conn: Connection;

beforeAll(async () => {
    conn = await connectionTest();
})

afterAll(async () =>{
    await conn.close()
})


const meQuery = `
{
    me{
        id
        firstName,
        lastName,
        email,
        deck
    }
}
`;

describe('Get My', () => {
    it('get user', async () => {
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save()
        const res = await gqlCall({
            source: meQuery,
            userId: user.id
        })

        console.log(res)
        expect(res).toMatchObject({
            data:{
                me:{
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email

                }
            }
        })
    })
})
