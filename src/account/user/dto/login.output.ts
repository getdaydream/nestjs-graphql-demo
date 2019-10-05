import { Field, ObjectType } from 'type-graphql';
import { User } from '../user.entity';

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
