import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlocksService } from './blocks.service';
import { Block } from './entities/block.entity';
import { CreateBlockInput } from './dto/create-block.input';
import { UpdateBlockInput } from './dto/update-block.input';

@Resolver(() => Block)
export class BlocksResolver {
  constructor(private readonly blocksService: BlocksService) {}

  @Mutation(() => Block)
  createBlock(@Args('createBlockInput') createBlockInput: CreateBlockInput) {
    return this.blocksService.create(createBlockInput);
  }

  @Query(() => [Block], { name: 'blocks' })
  findAll() {
    return this.blocksService.findAll();
  }

  @Query(() => Block, { name: 'block' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.blocksService.findOne(id);
  }

  @Mutation(() => Block)
  updateBlock(@Args('updateBlockInput') updateBlockInput: UpdateBlockInput) {
    return this.blocksService.update(updateBlockInput.id, updateBlockInput);
  }

  @Mutation(() => Block)
  removeBlock(@Args('id', { type: () => Int }) id: number) {
    return this.blocksService.remove(id);
  }
}
