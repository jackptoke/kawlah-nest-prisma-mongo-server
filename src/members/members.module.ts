import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { PrismaService } from '../utilities/prisma.service';

@Module({
  providers: [MembersResolver, MembersService, PrismaService],
})
export class MembersModule {}
