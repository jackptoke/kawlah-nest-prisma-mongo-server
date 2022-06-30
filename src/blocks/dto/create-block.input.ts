import { InputType, Field } from '@nestjs/graphql';
import {
  InputHeaderData,
  InputParagraphData,
} from '../../articles/dto/create-article.input';
import { BlockType } from '../entities/block.entity';
import {
  InputTableData,
  InputImageData,
  InputListData,
} from '../../articles/dto/create-article.input';

@InputType()
export class CreateBlockInput {
  @Field()
  id: string;
  @Field()
  blockId: string;
  @Field(() => BlockType)
  type: BlockType;
  @Field()
  sequenceNo: number;
  @Field()
  articleId: string;
  @Field(() => InputHeaderData, { nullable: true })
  headerData?: InputHeaderData;
  @Field(() => InputParagraphData, { nullable: true })
  paragraphData?: InputParagraphData;
  @Field(() => InputTableData, { nullable: true })
  tableData?: InputTableData;
  @Field(() => InputImageData, { nullable: true })
  imageData?: InputImageData;
  @Field(() => InputListData, { nullable: true })
  listData?: InputListData;
}
