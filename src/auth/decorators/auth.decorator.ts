import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthInternalServerErrorExceptionEntity,
  LoginEntity,
  LoginUnauthorizedExceptionEntity,
} from '../entities/auth.entity';

export function AuthControllerDecorator() {
  return applyDecorators(
    ApiTags('/auth'),
    ApiProduces('application/json; charset=utf-8'),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: '予期しないエラーが発生した場合に返却',
      type: AuthInternalServerErrorExceptionEntity,
    }),
  );
}

export function LoginDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'ログインAPI' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'ログイン処理が成功した時に返却',
      type: LoginEntity,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: '誤った認証情報が入力されたときに返却',
      type: LoginUnauthorizedExceptionEntity,
    }),
  );
}
