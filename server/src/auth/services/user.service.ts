import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(
      { id },
      { relations: ['feedPosts'] },
    );

    if (user) {
      delete user.password;
      return user;
    }
  }

  async updateUserImageById(
    id: number,
    imagePath: string,
  ): Promise<UpdateResult> {
    const user: User = new UserEntity();

    user.id = id;
    user.imagePath = imagePath;

    return this.userRepository.update(id, user);
  }

  async findImageNameByUserId(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ id });

    if (user) {
      delete user.password;
      return user.imagePath;
    }
  }
}
