import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from '../models/login-user.dto';
import { RegisterUserDto } from '../models/register-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ token: string }> {
    const jwt: string = await this.authService.registerAccount(registerUserDto);

    if (jwt) {
      return { token: jwt };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not created, try again',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const jwt: string = await this.authService.login(loginUserDto);

    if (jwt) {
      return { token: jwt };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Incorrect email or password, try again',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
