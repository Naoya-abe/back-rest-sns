import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  CommentsControllerDecorator,
  CreateCommentDecorator,
  DeleteCommentDecorator,
  FindAllCommentsByPostIdDecorator,
  FindOneCommentDecorator,
  UpdateCommentDecorator,
} from './decorators/comments.decorator';
import RequestWithUser from 'src/types/requestWithUser';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
@CommentsControllerDecorator()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @CreateCommentDecorator()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestWithUser,
  ): Promise<CommentEntity> {
    const user = req.user;
    return this.commentsService.create(createCommentDto, user);
  }

  @Get('post/:postId')
  @FindAllCommentsByPostIdDecorator()
  findAllByPostId(@Param('postId') postId: string): Promise<CommentEntity[]> {
    return this.commentsService.findAllByPostId(postId);
  }

  @Get(':id')
  @FindOneCommentDecorator()
  findOne(@Param('id') id: string): Promise<CommentEntity> {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UpdateCommentDecorator()
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @DeleteCommentDecorator()
  remove(@Param('id') id: string): Promise<CommentEntity> {
    return this.commentsService.remove(id);
  }
}
