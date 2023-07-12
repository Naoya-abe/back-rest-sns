import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class PostEntity {
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'PostのId',
  })
  id: string;

  @ApiProperty({
    example:
      'While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer.',
    description: 'Post内容',
  })
  content: string;

  @ApiProperty({
    example: {
      id: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
      email: 'sample1@email.com',
      username: 'sample1',
      selfIntroduction: 'Hello, I am sample1',
      createdAt: '2023-07-09T01:46:14.704Z',
      updatedAt: '2023-07-09T01:46:14.704Z',
    },
    description: 'PostしたUserの情報',
  })
  user: UserEntity;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Postの作成時刻（UTC）',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Postの最終更新時刻（UTC）',
  })
  updatedAt: Date;
}

export class PostJwtUnauthorizedException {
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

export class PostInternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong in /posts method()',
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

export class PostNotFoundExceptionEntity {
  @ApiProperty({
    example: 'Post with ID a279c303-9abb-4395-9533-c7bccd4a63fb not found',
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
