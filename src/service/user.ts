import { getRepository } from 'typeorm';
import { User } from '../entity/user';

export const userService = {
  async createUser({ email, password, name }): Promise<User> {
    const userRepo = getRepository(User);
    const user = userRepo.create({ email, password, name });
    try {
      return await userRepo.save(user);
    } catch (e) {
      throw e;
    }
  },
  // 如何表示user字段中的任意一个
  async find(conditions: object): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(conditions);
    return user;
  },
};
