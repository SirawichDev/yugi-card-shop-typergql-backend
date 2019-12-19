import { ObjectType,Field,ID } from 'type-graphql';
import { PrimaryGeneratedColumn, Entity,Column,BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Deck extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    rate: string;
    
    @Column("bool", {default: false})
    isEffect: boolean;

    @Field()
    @Column()
    effect: string;
}