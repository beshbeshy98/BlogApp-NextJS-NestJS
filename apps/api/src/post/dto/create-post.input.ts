import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNumber()
  @Field(() => Int, { nullable: true })
  postId: number;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  thumbnail?: string;

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];
}
