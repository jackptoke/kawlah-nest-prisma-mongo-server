import { CreateMemberInput } from './create-member.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {
  @Field()
  id: string;
}
