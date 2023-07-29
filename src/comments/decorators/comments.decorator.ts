import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CommentEntity,
  CommentBadRequestExceptionEntity,
  CommentInternalServerErrorExceptionEntity,
  CommentJwtUnauthorizedExceptionEntity,
  CommentNotFoundExceptionEntity,
} from '../entities/comment.entity';
import { PostNotFoundExceptionEntity } from 'src/posts/entities/post.entity';

export function CommentsControllerDecorator() {
  return applyDecorators(
    ApiTags('/comments'),
    ApiBearerAuth(),
    ApiProduces('application/json; charset=utf-8'),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'JWT認証に失敗したときに返却',
      type: CommentJwtUnauthorizedExceptionEntity,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: '予期しないエラーが発生した場合に返却',
      type: CommentInternalServerErrorExceptionEntity,
    }),
  );
}

export function CreateCommentDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体登録API' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '登録したCommentを返却',
      type: CommentEntity,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Commentの内容が空白の時に返却',
      type: CommentBadRequestExceptionEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つPostがない場合に返却',
      type: PostNotFoundExceptionEntity,
    }),
  );
}

export function FindAllCommentsByPostIdDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Post毎の全体取得API' }),
    ApiParam({
      name: 'postId',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post毎のComment一覧を返却',
      type: CommentEntity,
      isArray: true,
    }),
  );
}
