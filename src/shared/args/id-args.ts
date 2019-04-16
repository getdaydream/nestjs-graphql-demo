import { Field, Int, ArgsType } from 'type-graphql';
import { Min } from 'class-validator';

@ArgsType()
export class IDArgs {
  @Field(() => Int)
  @Min(1)
  id: number;
}
