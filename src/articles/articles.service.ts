import { Injectable } from '@nestjs/common';
import { AccountStatus, Role } from 'src/members/entities/member.entity';
import { PrismaService } from 'src/utilities/prisma.service';
import { CreateArticleInput, InputBlockData } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { BlockType } from '../blocks/entities/block.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArticleInput: CreateArticleInput) {
    const { authorId, publish, blocks } = createArticleInput;

    const articleData = {
      data: {
        authorId: authorId,
        publishedAt: publish ? new Date(Date.now()) : null,
      },
    };

    const article = await this.prismaService.article.create(articleData);

    blocks.forEach(async (block) => {
      // console.log('[BLOCK] inputBlock => ', block);
      const data = {
        data: {
          blockId: block.blockId,
          type: block.type,
          sequenceNo: block.sequenceNo,
          articleId: article.id,
          ...this.getBlockData(block),
        },
      };
      await this.prismaService.block.create(data);
      // result.then((block) => {
      //   ids.push({ id: block.id });
      // });
    });

    return article;
  }

  getBlockData(block: InputBlockData) {
    switch (block.type) {
      case BlockType.HEADER:
        return {
          headerData: {
            create: {
              text: block.headerData.text,
              level: block.headerData.level,
            },
          },
        };
      case BlockType.PARAGRAPH:
        return {
          paragraphData: {
            create: {
              text: block.paragraphData.text,
            },
          },
        };
      case BlockType.IMAGE:
        return {
          imageData: {
            create: {
              caption: block.imageData.caption,
              filename: block.imageData.filename,
              url: block.imageData.url,
              stretched: block.imageData.stretched,
              withBackground: block.imageData.withBackground,
              withBorder: block.imageData.withBorder,
            },
          },
        };
      case BlockType.LIST:
        return {
          listData: {
            create: {
              style: block.listData.style,
              items: {
                createMany: {
                  data: block.listData.items.map((item, index) => {
                    return { sequenceNo: index, text: item };
                  }),
                },
              },
            },
          },
        };
      case BlockType.TABLE:
        return {
          tableData: {
            create: {
              rows: {
                createMany: {
                  data: block.tableData.rows.map((row) => {
                    console.log('[row] => ', row);

                    return { items: row };
                  }),
                },
              },
            },
          },
        };
      default:
        return;
      // throw new Error('Invalid block type');
    }
  }

  async findAll() {
    return await this.prismaService.article.findMany({
      include: {
        author: true,
        blocks: {
          include: {
            headerData: true,
            paragraphData: true,
            imageData: true,
            listData: {
              include: {
                items: true,
              },
            },
            tableData: {
              include: {
                rows: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: string, updateArticleInput: UpdateArticleInput) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  getRole(role: string) {
    switch (role) {
      case 'SUPERADMIN':
        return Role.SUPERADMIN;
      case 'ADMIN':
        return Role.ADMIN;
      case 'EDITOR':
        return Role.EDITOR;
      case 'TRANSLATOR':
        return Role.TRANSLATOR;
      case 'MODERATOR':
        return Role.MODERATOR;
      default:
        return Role.USER;
    }
  }

  getStatus(status: string) {
    switch (status) {
      case 'NORMAL':
        return AccountStatus.NORMAL;
      case 'RESTRICTED':
        return AccountStatus.RESTRICTED;
      case 'DEACTIVATED':
        return AccountStatus.DEACTIVATED;
      default:
        throw new Error('Invalid account status');
    }
  }
}
