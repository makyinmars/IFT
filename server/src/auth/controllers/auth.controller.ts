import { Body, Controller, Header, Post } from '@nestjs/common';
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

    return { token: jwt };
  }

  @Post('login')
  @Header('Authorization', 'Bearer')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const jwt: string = await this.authService.login(loginUserDto);

    return { token: jwt };
  }
}
