import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../models/login-user.dto';
import { RegisterUserDto } from '../models/register-user.dto';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto;

    const validUser = await this.validateUser(email, password);

    if (validUser) {
      // Create JWT - credentials
      return this.jwtService.signAsync({ user });
    }
  }
}
