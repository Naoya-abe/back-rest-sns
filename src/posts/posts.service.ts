import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<PostEntity> {
    try {
      const { content } = createPostDto;
      const userId = user.id;
      const createdPost: Post = await this.prisma.post.create({
        data: { userId, content },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return {
        id: createdPost.id,
        content: createdPost.content,
        user: userWithoutPassword,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /posts create()',
      );
    }
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      const posts: Post[] = await this.prisma.post.findMany();
      const postsWithUser: Promise<PostEntity[]> = Promise.all(
        posts.map(async (post) => {
          const user: UserEntity = await this.usersService.findOneById(
            post.userId,
          );
          return {
            id: post.id,
            content: post.content,
            user,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
        }),
      );
      return postsWithUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /posts findAll()',
      );
    }
  }

  async findAllByUser(userId: string): Promise<PostEntity[]> {
    try {
      const user: UserEntity = await this.usersService.findOneById(userId);
      const posts: Post[] = await this.prisma.post.findMany({
        where: { userId },
      });
      const postsWithUser: PostEntity[] = posts.map((post) => {
        return {
          id: post.id,
          content: post.content,
          user,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });
      return postsWithUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /posts findAllByUser()',
      );
    }
  }

  async findOne(id: string): Promise<PostEntity> {
    try {
      const post: Post = await this.prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      const user: UserEntity = await this.usersService.findOneById(post.userId);
      return {
        id: post.id,
        content: post.content,
        user,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /posts findOne()',
        );
      }
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const { content } = updatePostDto;
      const updatedPost: Post = await this.prisma.post.update({
        where: { id },
        data: { content },
      });
      const user: UserEntity = await this.usersService.findOneById(
        updatedPost.userId,
      );
      return {
        id: updatedPost.id,
        content: updatedPost.content,
        user,
        createdAt: updatedPost.createdAt,
        updatedAt: updatedPost.updatedAt,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Something went wrong in /posts update()',
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedPost: Post = await this.prisma.post.delete({
        where: { id },
      });
      const user: UserEntity = await this.usersService.findOneById(
        deletedPost.userId,
      );
      return {
        id: deletedPost.id,
        content: deletedPost.content,
        user,
        createdAt: deletedPost.createdAt,
        updatedAt: deletedPost.updatedAt,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /posts remove()',
        );
      }
    }
  }
}
