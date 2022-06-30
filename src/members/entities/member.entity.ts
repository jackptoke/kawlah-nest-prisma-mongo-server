import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  TRANSLATOR = 'TRANSLATOR',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export enum AccountStatus {
  NORMAL = 'NORMAL',
  RESTRICTED = 'RESTRICTED',
  DEACTIVATED = 'DEACTIVATED',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Member role',
});

registerEnumType(AccountStatus, {
  name: 'AccountStatus',
  description: 'Member status',
});

@ObjectType()
export class Member {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  password: string;
  @Field(() => Role)
  role: Role;
  @Field(() => AccountStatus)
  status: AccountStatus;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  deletedAt: Date;
}
