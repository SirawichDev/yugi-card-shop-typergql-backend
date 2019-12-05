import { User } from './User';
import { ObjectType,Field,ID,Root } from 'type-graphql';
import { PrimaryGeneratedColumn, Entity,Column,BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Deck extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    showDeckName(@Root() parent: User): string {
        return parent.deckName
    }
    @Field()
    @Column()
    level: number;
    
    @Column("bool", {default: false})
    isEffect: boolean;

    @Field()
    @Column()
    effect: string;
}