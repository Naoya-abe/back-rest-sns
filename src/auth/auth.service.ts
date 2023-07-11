import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new UnauthorizedException();
      }

      const isCorrectPassword = await bcryptjs.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('Email or Password is incorrect');
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /auth validateUser()',
        );
      }
    }
  }

  async login(user: User): Promise<LoginEntity> {
    try {
      const payload = { email: user.email, id: user.id };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1m',
      });
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /auth login()',
      );
    }
  }
}
