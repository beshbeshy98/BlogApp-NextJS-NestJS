import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}
  async likePost({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }): Promise<boolean> {
    try {
      return !!(await this.prisma.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      }));
    } catch {
      throw new BadRequestException('You have already liked this post');
    }
  }

  async unlikePost({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }): Promise<boolean> {
    try {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return true;
    } catch {
      throw new BadRequestException('like not found');
    }
  }

  async getPostLikesCount(postId: number) {
    return this.prisma.like.count({
      where: {
        postId,
      },
    });
  }

  async userLikedPost({userId, postId} : {userId:number, postId: number}){
    return !!(await this.prisma.like.findFirst({
      where:{
        userId,
        postId
      }
    }))
  }
}
