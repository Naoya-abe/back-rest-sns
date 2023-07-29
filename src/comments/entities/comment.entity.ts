import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class CommentEntity {
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'CommentのId',
  })
  id: string;

  @ApiProperty({
    example: "It's nice!",
    description: 'Comment内容',
  })
  content: string;

  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'CommentしたPostのId',
  })
  postId: string;

  @ApiProperty({
    example: {
      id: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
      email: 'sample1@email.com',
      username: 'sample1',
      selfIntroduction: 'Hello, I am sample1',
      createdAt: '2023-07-09T01:46:14.704Z',
      updatedAt: '2023-07-09T01:46:14.704Z',
    },
    description: 'CommentしたUserの情報',
  })
  user: UserEntity;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Commentの作成時刻（UTC）',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Commentの最終更新時刻（UTC）',
  })
  updatedAt: Date;
}

export class CommentBadRequestExceptionEntity {
  @ApiProperty({
    example: '["content should not be empty"]',
    description: 'エラーメッセージ',
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request', description: 'エラー概要' })
  error: string;

  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}

export class CommentJwtUnauthorizedExceptionEntity {
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

export class CommentInternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong in /comments method()',
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

export class CommentNotFoundExceptionEntity {
  @ApiProperty({
    example: 'Comment with ID a279c303-9abb-4395-9533-c7bccd4a63fb not found',
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
