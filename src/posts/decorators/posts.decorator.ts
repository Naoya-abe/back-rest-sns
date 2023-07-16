import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PostEntity,
  PostInternalServerErrorExceptionEntity,
  PostJwtUnauthorizedException,
  PostNotFoundExceptionEntity,
} from '../entities/post.entity';
import { UserNotFoundExceptionEntity } from 'src/users/entities/user.entity';

export function PostsControllerDecorator() {
  return applyDecorators(
    ApiTags('/posts'),
    ApiProduces('application/json; charset=utf-8'),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'JWT認証に失敗したときに返却',
      type: PostJwtUnauthorizedException,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: '予期しないエラーが発生した場合に返却',
      type: PostInternalServerErrorExceptionEntity,
    }),
  );
}

export function CreatePostDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体登録API' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '登録したPostを返却',
      type: PostEntity,
    }),
  );
}

export function FindAllPostsDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '全体取得API' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post一覧を返却',
      type: PostEntity,
      isArray: true,
    }),
  );
}

export function FindAllPostsByUserDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'User毎のPost取得API' }),
    ApiParam({
      name: 'userId',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User毎のPost一覧を返却',
      type: PostEntity,
      isArray: true,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つUserがいない場合に返却',
      type: UserNotFoundExceptionEntity,
    }),
  );
}

export function FindOnePostByIdDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体取得API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '指定されたIDを持つPostを返却',
      type: PostEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つPostがない場合に返却',
      type: PostNotFoundExceptionEntity,
    }),
  );
}

export function UpdatePostDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体更新API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '編集したPostを返却',
      type: PostEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つPostがない場合に返却',
      type: PostNotFoundExceptionEntity,
    }),
  );
}

export function RemovePostDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体削除API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '削除したPostを返却',
      type: PostEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定したIDを持つPostがない場合に返却',
      type: PostNotFoundExceptionEntity,
    }),
  );
}
