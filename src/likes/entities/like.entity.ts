import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LikeEntity {
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'LikeのId',
  })
  id: string;

  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'LikeしたUserのId',
  })
  userId: string;

  @ApiProperty({
    example: 'b349c303-9abb-4395-9533-c7bccd4a63fc',
    description: 'LikeされたPostのId',
  })
  postId: string;

  @ApiProperty({
    example: '2023-07-09T01:46:14.704Z',
    description: 'Likeの作成時刻（UTC）',
  })
  createdAt: Date;
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
