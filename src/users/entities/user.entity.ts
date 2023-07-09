import { ApiProperty } from '@nestjs/swagger';

export class User {
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

export class UserCreateConflictException {
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
    example: 409,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}
