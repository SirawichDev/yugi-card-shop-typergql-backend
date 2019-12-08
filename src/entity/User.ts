import { Deck } from './Deck';
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
    @Column("text", { unique: true })
    email: string;

    @Field()
    deckInfo(@Root() parent: Deck): Deck {
        return parent
    }
    @Field()
    fav_deck: string;
    
    @Column()
    password: string;

    @Column("bool", { default: false })
    isEmailConfirmed: boolean;
}