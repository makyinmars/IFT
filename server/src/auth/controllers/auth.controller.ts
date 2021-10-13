import { Body, Controller, Post } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { LoginUserDto } from '../models/login-user.dto';
import { RegisterUserDto } from '../models/register-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() registerUserDto: RegisterUserDto,
  ): Observable<RegisterUserDto> {
    return from(this.authService.registerAccount(registerUserDto));
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Observable<{ token: string }> {
    return from(
      this.authService
        .login(loginUserDto)
        .pipe(map((jwt: string) => ({ token: jwt }))),
    );
  }
}
