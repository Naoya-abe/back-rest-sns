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
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したUser情報を返却',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みUser情報を複数返却',
    type: User,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのUser情報を返却',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体更新API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: 200,
    description: '更新後のUser情報を返却',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体削除API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: 200,
    description: '削除されたUserの情報を返却',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
