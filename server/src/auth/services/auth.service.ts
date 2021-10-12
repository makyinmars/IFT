import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../models/register-user.dto';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async registerAccount(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    const hashedPassword = await this.hashPassword(registerUserDto.password);

    registerUserDto.password = hashedPassword;

    return this.userRepository.save(registerUserDto);
  }
}
