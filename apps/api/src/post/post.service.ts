import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.post.count();
  }
  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findByUser({
    userId,
    take,
    skip,
  }: {
    userId: number;
    take: number;
    skip: number;
  }) {
    return await this.prisma.post.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      select: {
        id: true,
        content: true,
        published: true,
        createdAt: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take,
      skip,
    });
  }

  async userPostCount(userId: number) {
    return await this.prisma.post.count({
      where: {
        author: {
          id: userId,
        },
      },
    });
  }

  async createPost(createPostInput: CreatePostInput, authorId: number) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async updatePost(updatePostInput: UpdatePostInput,userId: number) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: {
        id: updatePostInput.postId,
        authorId: userId,
      },
    });

    if (!authorIdMatched) throw new UnauthorizedException();
    const {postId , ...data} = updatePostInput;
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...data,
        tags: {
          connectOrCreate: updatePostInput.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  }
}
