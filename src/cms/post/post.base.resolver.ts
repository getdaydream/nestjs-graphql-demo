import { ClassType, Resolver } from 'type-graphql';

export const createPostBaseResolver = <T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
) => {
  @Resolver({ isAbstract: true })
  abstract class PostBaseResolver {}

  // Be aware that with some tsconfig.json settings (like declarations: true),
  // we might receive a [ts] Return type of exported function has or is using private name 'BaseResolver' error,
  // in this case we might need to use any as the return type or create a separate class/interface describing the class methods and properties.
  return PostBaseResolver as any;
};
