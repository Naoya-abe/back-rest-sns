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
  LikeEntity,
  LikeInternalServerErrorExceptionEntity,
  LikeJwtUnauthorizedException,
  LikeNotFoundExceptionEntity,
} from '../entities/like.entity';
import { UserNotFoundExceptionEntity } from 'src/users/entities/user.entity';
import { PostNotFoundExceptionEntity } from 'src/posts/entities/post.entity';

export function LikesControllerDecorator() {
  return applyDecorators(
    ApiTags('/likes'),
    ApiBearerAuth(),
    ApiProduces('application/json; charset=utf-8'),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'JWT認証に失敗したときに返却',
      type: LikeJwtUnauthorizedException,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: '予期しないエラーが発生した場合に返却',
      type: LikeInternalServerErrorExceptionEntity,
    }),
  );
}

export function CreateLikeDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'いいね登録API' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '登録したLikeを返却',
      type: LikeEntity,
    }),
  );
}

export function FindAllLikesByPostDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Post毎のLike取得API' }),
    ApiParam({
      name: 'postId',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post毎のLike一覧を返却',
      type: LikeEntity,
      isArray: true,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つPostがない場合に返却',
      type: PostNotFoundExceptionEntity,
    }),
  );
}

export function RemoveLikeDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'いいね解除API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '解除したLikeを返却',
      type: LikeEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つLikeがない場合に返却',
      type: LikeNotFoundExceptionEntity,
    }),
  );
}
