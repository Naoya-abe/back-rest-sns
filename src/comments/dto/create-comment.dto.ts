import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  @ApiProperty({
    example:
      'While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer.',
    description: 'Comment内容',
  })
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
    description: 'CommentしたPostのId',
  })
  readonly postId: string;
}
