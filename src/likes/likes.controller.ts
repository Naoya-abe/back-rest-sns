import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import {
  CreateLikeDecorator,
  LikesControllerDecorator,
  FindAllLikesByPostDecorator,
  RemoveLikeDecorator,
} from './decorators/likes.decorator';
import { LikeEntity } from './entities/like.entity';
import RequestWithUser from 'src/types/requestWithUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
@LikesControllerDecorator()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @CreateLikeDecorator()
  create(
    @Body() createLikeDto: CreateLikeDto,
    @Req() req: RequestWithUser,
  ): Promise<LikeEntity> {
    const userId = req.user.id;
    return this.likesService.create(createLikeDto, userId);
  }

  @Get(':postId')
  @FindAllLikesByPostDecorator()
  findAllByPost(@Param('postId') postId: string) {
    return this.likesService.findAllByPost(postId);
  }

  @Delete(':postId')
  @RemoveLikeDecorator()
  remove(@Param('postId') postId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.likesService.remove(postId, userId);
  }
}
