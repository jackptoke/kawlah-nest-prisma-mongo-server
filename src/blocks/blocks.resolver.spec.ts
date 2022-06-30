import { Test, TestingModule } from '@nestjs/testing';
import { BlocksResolver } from './blocks.resolver';
import { BlocksService } from './blocks.service';

describe('BlocksResolver', () => {
  let resolver: BlocksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlocksResolver, BlocksService],
    }).compile();

    resolver = module.get<BlocksResolver>(BlocksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
