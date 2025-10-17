import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/:id')
  getUserByUd(@Param('id') id: string): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Post('signIn')
  signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
