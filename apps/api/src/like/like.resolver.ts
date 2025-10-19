import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Like } from './entities/like.entity';
import { LikeService } from './like.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  likePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return this.likeService.likePost({ userId, postId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlikePost(
    @Context() Context,
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<boolean> {
    const userId = Context.req.user.id;
    return this.likeService.unlikePost({ userId, postId });
  }

  @Query(() => Int)
  postLikesCount(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<number> {
    return this.likeService.getPostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.userLikedPost({ postId, userId });
  }
}
