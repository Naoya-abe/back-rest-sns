import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserDecorator,
  FindAllUsersDecorator,
  FindOneUserByIdDecorator,
  RemoveUserDecorator,
  UpdateUserDecorator,
  UsersControllerDecorator,
} from './decorators/users.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UsersControllerDecorator()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CreateUserDecorator()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @FindAllUsersDecorator()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @FindOneUserByIdDecorator()
  @UseGuards(AuthGuard('jwt'))
  findOneById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UpdateUserDecorator()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RemoveUserDecorator()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
