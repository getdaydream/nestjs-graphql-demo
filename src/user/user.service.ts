import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async get(id: number) {
    return await this.userRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async create(createUserDto: CreateUserDto) {
    const { userRepository } = this;

    const user = await this.getByEmail(createUserDto.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await userRepository.save(userRepository.create(createUserDto));
  }
}
