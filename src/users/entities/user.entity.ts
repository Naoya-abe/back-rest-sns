import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'UserのID',
  })
  id: string;

  @ApiProperty({
    example: 'sample1@email.com',
    description: 'Userのメールアドレス',
  })
  email: string;

  @ApiProperty({ example: 'sample1', description: ' Userの名前' })
  username: string;

  @ApiProperty({
    example: 'Hello, I am sample1',
    description: 'Userの自己紹介',
  })
  selfIntroduction: string;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Userの作成時刻（UTC）',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Userの最終更新時刻（UTC）',
  })
  updatedAt: Date;
}

export class UserJwtUnauthorizedException {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}

export class UserCreateConflictExceptionEntity {
  @ApiProperty({
    example: 'Email sample1@email.com already exists',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({
    example: 'Conflict',
    description: 'エラー概要',
  })
  error: string;

  @ApiProperty({
    example: HttpStatus.CONFLICT,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}

export class UserNotFoundExceptionEntity {
  @ApiProperty({
    example: 'User with ID a279c303-9abb-4395-9533-c7bccd4a63fb not found',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'エラー概要',
  })
  error: string;

  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}

export class UserInternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong in /users method()',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({ example: 'Internal Server Error', description: 'エラー概要' })
  error: string;

  @ApiProperty({
    example: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}
