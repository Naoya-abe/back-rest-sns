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
}
