import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Mutation(() => Member)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.membersService.create(createMemberInput);
  }

  @Query(() => [Member], { name: 'members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Query(() => Member || null, { name: 'member' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const member = await this.membersService.findOne(id);
    console.log('[findOne] member:', member);

    if (member) return member;
    return null;
  }

  @Mutation(() => Member)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.membersService.update(updateMemberInput.id, updateMemberInput);
  }

  @Mutation(() => Member)
  removeMember(@Args('id', { type: () => String }) id: string) {
    return this.membersService.remove(id);
  }
}
