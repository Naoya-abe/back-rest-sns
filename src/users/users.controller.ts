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
import {
  UserEntity,
  UserCreateConflictExceptionEntity,
  UserNotFoundExceptionEntity,
} from './entities/user.entity';
import { InternalServerErrorExceptionEntity } from './entities/internal-server-error-exception.entity';

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
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: '同じemailを持つUserが存在する場合に返却',
    type: UserCreateConflictExceptionEntity,
  })
  @ApiResponse({
    status: 500,
    description: '予期しないエラーが発生した場合に返却',
    type: InternalServerErrorExceptionEntity,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みUser情報を複数返却',
    type: UserEntity,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: '予期しないエラーが発生した場合に返却',
    type: InternalServerErrorExceptionEntity,
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
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: '指定されたUserIDがDBに存在しない時に返却',
    type: UserNotFoundExceptionEntity,
  })
  @ApiResponse({
    status: 500,
    description: '予期しないエラーが発生した場合に返却',
    type: InternalServerErrorExceptionEntity,
  })
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
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
    type: UserEntity,
  })
  @ApiResponse({
    status: 500,
    description: '予期しないエラーが発生した場合に返却',
    type: InternalServerErrorExceptionEntity,
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
    type: UserEntity,
  })
  @ApiResponse({
    status: 500,
    description: '予期しないエラーが発生した場合に返却',
    type: InternalServerErrorExceptionEntity,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
