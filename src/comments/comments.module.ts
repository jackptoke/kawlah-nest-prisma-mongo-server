import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PrismaService } from 'src/utilities/prisma.service';

@Module({
  providers: [CommentsResolver, CommentsService, PrismaService],
})
export class CommentsModule {}
