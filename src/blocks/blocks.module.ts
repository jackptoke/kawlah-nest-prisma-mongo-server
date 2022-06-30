import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksResolver } from './blocks.resolver';
import { PrismaService } from 'src/utilities/prisma.service';

@Module({
  providers: [BlocksResolver, BlocksService, PrismaService],
})
export class BlocksModule {}
