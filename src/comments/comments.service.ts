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

  async findAll() {
    return `This action returns all comments`;
  }

  async findAllByPostId(postId: string) {
    return `This action returns all comments by PostId`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
