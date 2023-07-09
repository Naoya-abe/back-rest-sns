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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        throw new InternalServerErrorException(
          'Something went wrong in /user create()',
        );
      }
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users: User[] = await this.prisma.user.findMany();
      const usersWithoutPassword = users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return usersWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in /user findAll()',
      );
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) throw new NotFoundException();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(`User with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /user findOne()',
        );
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { email, username, selfIntroduction } = updateUserDto;
      const updatedUser: User = await this.prisma.user.update({
        where: { id },
        data: { email, username, selfIntroduction },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updatedUserWithoutPassword } = updatedUser;
      return updatedUserWithoutPassword;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        } else if (error.code === 'P2002') {
          throw new ConflictException(
            `Email ${updateUserDto.email} already exists`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Something went wrong in /user update()',
      );
    }
  }

  async remove(id: string): Promise<UserEntity> {
    try {
      const deletedUser: User = await this.prisma.user.delete({
        where: { id },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...deletedUserWithoutPassword } = deletedUser;
      return deletedUserWithoutPassword;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException(
          'Something went wrong in /user delete()',
        );
      }
    }
  }
}
