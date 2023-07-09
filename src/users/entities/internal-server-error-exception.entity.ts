import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({ example: 'Internal Server Error', description: 'エラー概要' })
  error: string;

  @ApiProperty({ example: 500, description: 'HTTPステータスコード' })
  statusCode: number;
}
