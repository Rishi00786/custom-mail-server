import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDTO: { email: string; password: string }) {
    try {
      const { email, password } = loginDTO;
      const isValid = await this.authService.signIn(email, password);

      if (!isValid) {
        return { message: 'Invalid credentials' };
      }

      return {
        message: 'Login successful',
        access_token: isValid.access_token,
      };
    } catch (error) {
      return { message: 'Error validating user', error };
    }
  }
}
