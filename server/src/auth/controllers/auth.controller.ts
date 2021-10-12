import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../models/register-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<RegisterUserDto> {
    return this.authService.registerAccount(registerUserDto);
  }
}
