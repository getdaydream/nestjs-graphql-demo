import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: number) {
    return await this.userRepository.findOne(id);
  }

  async getOneByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email')
      .setParameter('email', email)
      .getOne();
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

  async getOneByName(nickname: string) {
    return await this.userRepository.findOne({ nickname });
  }

  async create(createUserDto: DeepPartial<UserEntity>) {
    const { userRepository } = this;

    const user = await this.getOneByEmail(createUserDto.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await userRepository.save(userRepository.create(createUserDto));
  }
}
