import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
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
  UserInternalServerErrorExceptionEntity,
} from './entities/user.entity';

@Controller('users')
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '登録したUser情報を返却',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '同じemailを持つUserが存在する場合に返却',
    type: UserCreateConflictExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: UserInternalServerErrorExceptionEntity,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '登録済みUser情報を複数返却',
    type: UserEntity,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: UserInternalServerErrorExceptionEntity,
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
    status: HttpStatus.OK,
    description: '指定されたIDのUser情報を返却',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定されたUserIDがDBに存在しない時に返却',
    type: UserNotFoundExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: UserInternalServerErrorExceptionEntity,
  })
  findOneById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOneById(id);
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
    status: HttpStatus.OK,
    description: '更新後のUser情報を返却',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定されたUserIDがDBに存在しない時に返却',
    type: UserNotFoundExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      '更新しようとしたemailが既に他のUserによって使用されている時に返却',
    type: UserCreateConflictExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: UserInternalServerErrorExceptionEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
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
    status: HttpStatus.OK,
    description: '削除されたUserの情報を返却',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定されたUserIDがDBに存在しない時に返却',
    type: UserNotFoundExceptionEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '予期しないエラーが発生した場合に返却',
    type: UserInternalServerErrorExceptionEntity,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
