import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { email, password } = createUserDto;
      const username = email.substring(0, email.indexOf('@'));
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const createdUser: User = await this.prisma.user.create({
        data: { email, password: hashedPassword, username },
      });

      // Remove password from the user object
      const { password: _, ...userWithoutPassword } = createdUser;

      return userWithoutPassword;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Email ${createUserDto.email} already exists`,
        );
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users: User[] = await this.prisma.user.findMany();
      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return usersWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) throw new NotFoundException();
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(`User with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
