import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from './emailAlreadyExistValidation';


@InputType()
export class RegisterParams {
    @Field()
    @Length(1, 255)
    firstName: string;


    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "This Email is Already Exist" })
    email: string;

    @Field()
    @Length(1,255)
    deck: string;

    @Field()
    password: string;
}