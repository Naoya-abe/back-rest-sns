import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Like } from '@prisma/client';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto, userId): Promise<LikeEntity> {
    try {
      const { postId } = createLikeDto;
      const createdLike: Like = await this.prisma.like.create({
        data: { postId, userId },
      });
      return createdLike;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByPost(postId: string): Promise<LikeEntity[]> {
    try {
      const likes: Like[] = await this.prisma.like.findMany({
        where: { postId },
      });
      return likes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(postId: string, userId: string): Promise<LikeEntity> {
    try {
      const targetLike: Like[] = await this.prisma.like.findMany({
        where: { postId, userId },
      });
      const targetLikeId: string = targetLike[0].id;
      const deletedLike: Like = await this.prisma.like.delete({
        where: { id: targetLikeId },
      });
      return deletedLike;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
