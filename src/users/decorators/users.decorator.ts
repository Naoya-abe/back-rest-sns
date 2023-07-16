import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserCreateConflictExceptionEntity,
  UserEntity,
  UserInternalServerErrorExceptionEntity,
  UserNotFoundExceptionEntity,
} from '../entities/user.entity';

export function UsersControllerDecorator() {
  return applyDecorators(
    ApiTags('/users'),
    ApiProduces('application/json; charset=utf-8'),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: '予期しないエラーが発生した場合に返却',
      type: UserInternalServerErrorExceptionEntity,
    }),
  );
}

export function CreateUserDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体登録API' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '登録したUser情報を返却',
      type: UserEntity,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: '同じemailを持つUserが存在する場合に返却',
      type: UserCreateConflictExceptionEntity,
    }),
  );
}

export function FindAllUsersDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '全体取得API' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '登録済みUser情報を複数返却',
      type: UserEntity,
      isArray: true,
    }),
  );
}

export function FindOneUserByIdDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体取得API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '指定されたIDのUser情報を返却',
      type: UserEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定されたUserIDがDBに存在しない時に返却',
      type: UserNotFoundExceptionEntity,
    }),
  );
}

export function UpdateUserDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体更新API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '更新後のUser情報を返却',
      type: UserEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定されたUserIDがDBに存在しない時に返却',
      type: UserNotFoundExceptionEntity,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description:
        '更新しようとしたemailが既に他のUserによって使用されている時に返却',
      type: UserCreateConflictExceptionEntity,
    }),
  );
}

export function RemoveUserDecorator() {
  return applyDecorators(
    ApiOperation({ summary: '単体削除API' }),
    ApiParam({
      name: 'id',
      type: String,
      example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '削除されたUserの情報を返却',
      type: UserEntity,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: '指定されたUserIDがDBに存在しない時に返却',
      type: UserNotFoundExceptionEntity,
    }),
  );
}
