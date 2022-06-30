import { Injectable } from '@nestjs/common';
import { CreateBlockInput } from './dto/create-block.input';
import { UpdateBlockInput } from './dto/update-block.input';

@Injectable()
export class BlocksService {
  create(createBlockInput: CreateBlockInput) {
    return 'This action adds a new block';
  }

  findAll() {
    return `This action returns all blocks`;
  }

  findOne(id: string) {
    return `This action returns a #${id} block`;
  }

  update(id: string, updateBlockInput: UpdateBlockInput) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
