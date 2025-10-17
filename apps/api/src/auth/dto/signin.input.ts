import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()

export class SignInInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    @IsString()
    @MinLength(1)
    password: string;
}
    