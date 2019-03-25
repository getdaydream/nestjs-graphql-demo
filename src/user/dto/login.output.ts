import { ObjectType, Field } from 'type-graphql';
import { UserEntity } from '..';

@ObjectType()
export class LoginOutput {
  @Field()
  user: UserEntity;

  @Field()
  token: string;
}
