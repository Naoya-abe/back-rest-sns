import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  AuthInternalServerErrorExceptionEntity,
  LoginEntity,
  LoginUnauthorizedExceptionEntity,
} from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from '../types/requestWithUser';

@Controller('auth')
@ApiTags('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ログインAPI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ログイン処理が成功した時に返却',
    type: LoginEntity,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '誤った認証情報が入力されたときに返却',
    type: LoginUnauthorizedExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: AuthInternalServerErrorExceptionEntity,
  })
  login(
    @Body() loginDto: LoginDto,
    @Req() req: RequestWithUser,
  ): Promise<LoginEntity> {
    return this.authService.login(req.user);
  }
}
