import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t42p4AHef69Tyyi88U6+p0utZYYrg7mmCGhoAd7Zffs',
    description: 'APIを叩く際に必要なアクセストークン',
  })
  accessToken: string;
}

export class LoginUnauthorizedExceptionEntity {
  @ApiProperty({
    example: 'Email or Password is incorrect',
    description: 'エラーメッセージ',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'エラー概要',
  })
  error: string;

  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
    description: 'HTTPステータスコード',
  })
  statusCode: number;
}

export class AuthInternalServerErrorExceptionEntity {
  @ApiProperty({
    example: 'Something went wrong in /auth method()',
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
