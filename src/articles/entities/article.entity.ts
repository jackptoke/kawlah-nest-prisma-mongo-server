import { ObjectType, Field } from '@nestjs/graphql';
import { Block } from 'src/blocks/entities/block.entity';
import { Member } from 'src/members/entities/member.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@ObjectType()
export class Article {
  @Field()
  id: string;
  @Field(() => [Block])
  blocks: Block[];
  @Field(() => Member)
  author: Member;
  @Field()
  authorId: string;
  @Field(() => [Comment])
  comments: Comment[];
  @Field()
  createdAt: Date;
  @Field()
  publishedAt?: Date;
}
