import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID, Root } from 'type-graphql';
@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    deckName: string;

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Field()
    showList(@Root() parent: User): string {
        return `your name is ${parent.firstName} and your deck is ${parent.deckName}`
    }

    @Column()
    password: string;

    @Column("bool", { default: false })
    isEmailConfirmed: boolean;
}