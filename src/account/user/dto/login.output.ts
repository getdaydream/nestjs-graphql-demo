import { ObjectType, Field } from 'type-graphql';
import { User } from '..';

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
