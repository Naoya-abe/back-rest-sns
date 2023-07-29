import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, User } from '@prisma/client';
import { CommentEntity } from './entities/comment.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<CommentEntity> {
    try {
      const { content, postId } = createCommentDto;
      const userId = user.id;
      const createdComment: Comment = await this.prisma.comment.create({
        data: { content, userId, postId },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return {
        id: createdComment.id,
        content: createdComment.content,
        user: userWithoutPassword,
        postId: createdComment.postId,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt,
      };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `The Post with ${createCommentDto.postId} does not exist.`,
        );
      }
      throw new InternalServerErrorException(
        'Something went wrong in /comments create()',
      );
    }
  }

  async findAllByPostId(postId: string): Promise<CommentEntity[]> {
    try {
      const comments: Comment[] = await this.prisma.comment.findMany({
        where: { postId },
      });
      const commentEntities: CommentEntity[] = await Promise.all(
        comments.map(async (comment) => {
          const userWithoutPassword: UserEntity =
            await this.usersService.findOneById(comment.userId);
          return {
            id: comment.id,
            content: comment.content,
            user: userWithoutPassword,
            postId: comment.postId,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
          };
        }),
      );
      return commentEntities;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /comments findAllByPostId()',
      );
    }
  }

  async findOne(id: string): Promise<CommentEntity> {
    try {
      const comment: Comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        throw new NotFoundException(`The Comment with ${id} does not exist.`);
      }
      const userWithoutPassword: UserEntity =
        await this.usersService.findOneById(comment.userId);
      return {
        id: comment.id,
        content: comment.content,
        user: userWithoutPassword,
        postId: comment.postId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    } catch (error) {
      if (error.status === 404) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /comments findOne()',
        );
      }
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
