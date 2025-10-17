import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@ObjectType()
export class Like {

    @Field(() => Int)
    id: number;

    @Field(() => User)
    user: User;

    @Field(() => Post)
    post: Post;

    @Field()
    createdAt: Date;

    @Field(() => User)
    author: User

    @Field(() => [Tag])
    tags: Tag[];

    @Field(() => [CommentEntity])
    comments: CommentEntity[];
}
