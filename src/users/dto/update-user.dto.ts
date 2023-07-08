import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'sample1@email.com',
    description: 'Userのメールアドレス',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'sample1',
    description: ' Userの名前',
    required: false,
  })
  username?: string;

  @ApiProperty({
    example: 'Hello, I am sample1',
    description: 'Userの自己紹介',
    required: false,
  })
  selfIntroduction?: string;
}
