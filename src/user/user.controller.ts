import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/createUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(createUserDTO);
      return { message: 'User created successfully', user };
    } catch (error) {
      return { message: 'Error creating user', error };
    }
  }

  @Post('login')
  async login(@Body() loginDTO: { email: string; password: string }) {
    try {
      const { email, password } = loginDTO;
      const isValid = await this.userService.validateUser(email, password);

      if (!isValid) {
        return { message: 'Invalid credentials' };
      }

      return { message: 'Login successful' };
    } catch (error) {
      return { message: 'Error validating user', error };
    }
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
