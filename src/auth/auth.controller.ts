import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from '../types/requestWithUser';
import {
  AuthControllerDecorator,
  LoginDecorator,
} from './decorators/auth.decorator';

@Controller('auth')
@AuthControllerDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @LoginDecorator()
  login(@Body() loginDto: LoginDto, @Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
