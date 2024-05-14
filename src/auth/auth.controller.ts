import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GetUser, RawHeader } from './decorators';

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post("login")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get("private")
  @UseGuards(AuthGuard())
  testtingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser("email") userEmail: string,

    @RawHeader() rawHeader: string[],
  ){

    console.log(request);
    

    return {
      ok: true,
      message: "Hola mundo Private",
      user,
      userEmail,
      rawHeader
    }
  }

}
