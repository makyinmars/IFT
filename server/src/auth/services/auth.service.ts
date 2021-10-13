import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Observable } from 'rxjs';
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

  hashPassword(password: string): Observable<string> {
    return bcrypt.hash(password, 12);
  }

  registerAccount(
    registerUserDto: RegisterUserDto,
  ): Observable<RegisterUserDto> {}

  login(loginUserDto: LoginUserDto): Observable<string> {}
}
