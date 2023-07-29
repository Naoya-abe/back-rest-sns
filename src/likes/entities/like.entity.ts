import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';

export class LikeEntity {
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'LikeのId',
  })
  id: string;

  @ApiProperty({
    example: {
      id: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
      email: 'sample1@email.com',
      username: 'sample1',
      selfIntroduction: 'Hello, I am sample1',
      createdAt: '2023-07-09T01:46:14.704Z',
      updatedAt: '2023-07-09T01:46:14.704Z',
    },
    description: 'LikeしたUserの情報',
  })
  user: UserEntity;

  @ApiProperty({
    example: {
      id: 'b349c303-9abb-4395-9533-c7bccd4a63fc',
      content: 'This is a post content.',
      createdAt: '2023-07-09T01:46:14.704Z',
      updatedAt: '2023-07-09T01:46:14.704Z',
    },
    description: 'LikeされたPostの情報',
  })
  post: PostEntity;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Likeの作成時刻（UTC）',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Likeの最終更新時刻（UTC）',
  })
  updatedAt: Date;
}

export class LikeJwtUnauthorizedException {
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

export class LikeInternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong in /likes method()',
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

export class LikeNotFoundExceptionEntity {
  @ApiProperty({
    example: 'The Like with ID a279c303-9abb-4395-9533-c7bccd4a63fb not found',
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
