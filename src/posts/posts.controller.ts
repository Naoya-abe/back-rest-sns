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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from 'src/types/requestWithUser';
import { PostEntity } from './entities/post.entity';
import {
  CreatePostDecorator,
  FindAllPostsByUserDecorator,
  FindAllPostsDecorator,
  FindOnePostByIdDecorator,
  PostsControllerDecorator,
  RemovePostDecorator,
  UpdatePostDecorator,
} from './decorators/posts.decorator';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@PostsControllerDecorator()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @CreatePostDecorator()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestWithUser,
  ): Promise<PostEntity> {
    const user = req.user;
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @FindAllPostsDecorator()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':userId')
  @FindAllPostsByUserDecorator()
  findAllByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findAllByUser(userId);
  }

  @Get(':id')
  @FindOnePostByIdDecorator()
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UpdatePostDecorator()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @RemovePostDecorator()
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
