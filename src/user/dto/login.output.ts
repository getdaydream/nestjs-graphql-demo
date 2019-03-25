import { ObjectType, Field } from 'type-graphql';
import { UserEntity } from '..';

@ObjectType()
export class LoginResult {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  token: string;
}
