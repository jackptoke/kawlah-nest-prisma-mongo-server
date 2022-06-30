import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Article } from 'src/articles/entities/article.entity';

export enum BlockType {
  HEADER = 'HEADER',
  PARAGRAPH = 'PARAGRAPH',
  IMAGE = 'IMAGE',
  TABLE = 'TABLE',
  LIST = 'LIST',
  DELIMITER = 'DELIMITER',
}

export enum ListStyle {
  LIST = 'LIST',
  ORDERED = 'ORDERED',
}

registerEnumType(ListStyle, {
  name: 'ListStyle',
  description: 'The type of list',
});

registerEnumType(BlockType, {
  name: 'BlockType',
  description: 'The type of block',
});

@ObjectType()
export class HeaderBlock {
  @Field()
  id: string;
  @Field()
  text: string;
  @Field(() => Int)
  level: number;
  // @Field(() => Block)
  // block: Block;
  @Field()
  blockId: string;
}

@ObjectType()
export class ImageBlock {
  @Field()
  id: string;
  @Field()
  caption: string;
  @Field()
  url: string;
  @Field()
  filename: string;
  @Field()
  stretched: boolean;
  @Field()
  withBackground: boolean;
  @Field()
  withBorder: boolean;
  // @Field(() => Block)
  // block: Block;
  @Field()
  blockId: string;
}

@ObjectType()
export class ListBlock {
  @Field()
  id: string;
  @Field(() => ListStyle)
  style: ListStyle;
  // @Field()
  // block: Block;
  @Field()
  blockId: string;
  @Field(() => [ListItem])
  items: ListItem[];
}

@ObjectType()
export class ListItem {
  @Field()
  id: string;
  @Field()
  text: string;
  @Field(() => Int)
  sequenceNo: number;
  // @Field(() => ListBlock)
  // list: ListBlock;
  @Field()
  listId: string;
}

@ObjectType()
export class ParagraphBlock {
  @Field()
  id: string;
  @Field()
  text: string;
  // @Field(() => Block)
  // block: Block;
  @Field()
  blockId: string;
}

@ObjectType()
export class TableBlock {
  @Field()
  id: string;
  @Field(() => [TableRow])
  rows: TableRow[];
  // @Field(() => Block)
  // block: Block;
  @Field()
  blockId: string;
}

@ObjectType()
export class TableRow {
  @Field()
  id: string;
  @Field(() => [String])
  items: string[];
  // @Field(() => TableBlock)
  // table: TableBlock;
  @Field()
  tableId: string;
}

@ObjectType()
export class Block {
  @Field()
  id: string;
  @Field()
  blockId: string;
  @Field(() => BlockType)
  type: BlockType;
  @Field()
  sequenceNo: number;
  @Field(() => Article)
  article: Article;
  @Field()
  articleId: string;
  @Field(() => HeaderBlock, { nullable: true })
  headerData?: HeaderBlock;
  @Field(() => ImageBlock, { nullable: true })
  imageData?: ImageBlock;
  @Field(() => ListBlock, { nullable: true })
  listData?: ListBlock;
  @Field(() => ParagraphBlock, { nullable: true })
  paragraphData?: ParagraphBlock;
  @Field(() => TableBlock, { nullable: true })
  tableData?: TableBlock;
}
