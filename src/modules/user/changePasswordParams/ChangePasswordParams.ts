import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";


@InputType()
export class ChangePasswordParams extends PasswordInput {

    @Field()
    token: string;
}