import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  @ApiProperty({
    example:
      'While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer.',
    description: '投稿内容',
  })
  content: string;
}
