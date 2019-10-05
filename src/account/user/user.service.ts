import { BaseService } from '@/shared/base';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async get(id: number) {
    return await this.userRepository.findOne(id);
  }

  async getOneByEmailAndPassword(email: string, password: string) {
    const passwordHash = createHmac('sha256', password).digest('hex');
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email and user.password = :password')
      .setParameter('email', email)
      .setParameter('password', passwordHash)
      .getOne();
  }

  async create(createUserDto: DeepPartial<User>) {
    const { userRepository } = this;

    const user = await this.findOne({ email: createUserDto.email });

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await userRepository.save(userRepository.create(createUserDto));
  }
}
