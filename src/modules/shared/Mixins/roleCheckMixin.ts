import { ClassType, Field, InputType } from "type-graphql";

export const RoleMixins = <T extends ClassType>(BaseClass: T) => {
    @InputType()
    class RoleInput extends BaseClass {
        @Field()
        user: boolean;
    }

    return RoleInput;
}