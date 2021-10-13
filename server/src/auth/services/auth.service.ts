import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(
    registerUserDto: RegisterUserDto,
  ): Observable<RegisterUserDto> {
    const { firstName, lastName, email, password } = registerUserDto;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          }),
        );
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    const { email, password } = loginUserDto;

    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          // create a jwt for credentials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
