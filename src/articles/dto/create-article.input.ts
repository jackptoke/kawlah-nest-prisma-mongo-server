import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ListStyle, BlockType } from '../../blocks/entities/block.entity';

@InputType()
export class InputParagraphData {
  @Field()
  text: string;
}

@InputType()
export class InputHeaderData extends PartialType(InputParagraphData) {
  @Field(() => Int)
  level: number;
}

@InputType()
export class InputTableRowData {
  @Field(() => [String])
  items: string[];
}

@InputType()
export class InputTableData {
  @Field(() => [[String]])
  rows: string[][];
}

@InputType()
export class InputListItemData {
  @Field(() => Int)
  sequenceNo: number;

  @Field()
  text: string;
}

@InputType()
export class InputListData {
  @Field(() => ListStyle)
  style: ListStyle;
  @Field(() => [String])
  items: string[];
}

@InputType()
export class InputImageData {
  @Field()
  filename: string;
  @Field()
  url: string;
  @Field()
  caption: string;
  @Field()
  stretched: boolean;
  @Field()
  withBackground: boolean;
  @Field()
  withBorder: boolean;
}

@InputType()
export class InputBlockData {
  @Field()
  blockId: string;
  @Field(() => Int)
  sequenceNo: number;
  @Field(() => BlockType)
  type: BlockType;

  @Field(() => InputHeaderData, { nullable: true })
  headerData?: InputHeaderData;

  @Field(() => InputParagraphData, { nullable: true })
  paragraphData?: InputParagraphData;

  @Field(() => InputTableData, { nullable: true })
  tableData?: InputTableData;

  @Field(() => InputListData, { nullable: true })
  listData?: InputListData;

  @Field(() => InputImageData, { nullable: true })
  imageData?: InputImageData;
} // , 'headerData', 'imageData', 'listData', 'paragraphData', 'tableData'

@InputType()
export class CreateArticleInput {
  @Field(() => [InputBlockData])
  blocks: InputBlockData[];
  @Field()
  authorId: string;
  @Field()
  publish?: boolean;
}
