import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @FindOneUserByIdDecorator()
  findOneById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UpdateUserDecorator()
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RemoveUserDecorator()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
