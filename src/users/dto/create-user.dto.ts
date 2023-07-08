import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'sample1@email.com',
    description: 'Userのメールアドレス',
  })
  email: string;

  @ApiProperty({
    example: 'sample1234567890',
    description: 'Userのパスワード',
  })
  password: string;
}
