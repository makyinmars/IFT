import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../models/update-user.dto';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.class';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['feedPosts'] });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(
      { id },
      { relations: ['feedPosts'] },
    );

    if (user) {
      delete user.password;
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ id }, updateUserDto);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
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
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Image not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
