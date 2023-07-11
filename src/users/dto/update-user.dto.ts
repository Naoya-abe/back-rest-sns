import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'sample1@email.com',
    description: 'Userのメールアドレス',
    required: false,
  })
  email?: string;

  @IsString()
  @ApiProperty({
    example: 'sample1',
    description: ' Userの名前',
    required: false,
  })
  username?: string;

  @IsString()
  @ApiProperty({
    example: 'Hello, I am sample1',
    description: 'Userの自己紹介',
    required: false,
  })
  selfIntroduction?: string;
}
