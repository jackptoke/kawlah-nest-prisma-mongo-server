import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { PrismaService } from '../utilities/prisma.service';
import * as bcrypt from 'bcrypt';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(private readonly prismaService: PrismaService) {}
  private saltOrRound = 12;
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRound);
  }

  async create(createMemberInput: CreateMemberInput) {
    const { username, firstName, lastName, email } = createMemberInput;
    const password = await this.hashPassword(createMemberInput.password);
    const createdAt = new Date(Date.now());
    return await this.prismaService.member.create({
      data: {
        username,
        firstName,
        lastName,
        password,
        email,
        createdAt,
        deletedAt: null,
      },
    });
  }

  async findAll() {
    return await this.prismaService.member.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.member.findFirst({
      where: { id: id },
    });
  }

  async findOneByUsername(username: string) {
    return await this.prismaService.member.findFirst({
      where: { username: username },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.member.findFirst({
      where: { email: email },
    });
  }

  removeId(member) {
    const { id, ...newObj } = member;
    return newObj;
  }

  async update(id: string, updateMemberInput: UpdateMemberInput) {
    const { password, ...memberData } = this.removeId(updateMemberInput);
    let data;
    if (password) {
      const hashed = this.hashPassword(password);
      data = { password: hashed, ...memberData };
    } else {
      data = { ...memberData };
    }
    const argument = {
      where: { id: id },
      data: {
        ...data,
      },
    };
    return await this.prismaService.member.update(argument);
  }

  async remove(id: string) {
    const result = await this.prismaService.member.delete({
      where: { id: id },
    });
    console.log('[remove] ', result);

    return result;
  }
}
