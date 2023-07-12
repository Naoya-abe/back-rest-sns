import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/types/requestWithUser';
import {
  PostEntity,
  PostInternalServerErrorExceptionEntity,
  PostJwtUnauthorizedException,
  PostNotFoundExceptionEntity,
} from './entities/post.entity';
import { UserNotFoundExceptionEntity } from 'src/users/entities/user.entity';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@ApiTags('/posts')
@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'JWT認証に失敗したときに返却',
  type: PostJwtUnauthorizedException,
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: '予期しないエラーが発生した場合に返却',
  type: PostInternalServerErrorExceptionEntity,
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '登録したPostを返却',
    type: PostEntity,
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestWithUser,
  ): Promise<PostEntity> {
    const user = req.user;
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post一覧を返却',
    isArray: true,
    type: PostEntity,
  })
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':userId')
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User毎のPost一覧を返却',
    isArray: true,
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定したIDを持つUserがいない場合に返却',
    type: UserNotFoundExceptionEntity,
  })
  findAllByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '指定されたIDを持つPostを返却',
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定したIDを持つPostがない場合に返却',
    type: PostNotFoundExceptionEntity,
  })
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '編集したPostを返却',
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定したIDを持つPostがない場合に返却',
    type: PostNotFoundExceptionEntity,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a279c303-9abb-4395-9533-c7bccd4a63fb',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '削除したPostを返却',
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '指定したIDを持つPostがない場合に返却',
    type: PostNotFoundExceptionEntity,
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
