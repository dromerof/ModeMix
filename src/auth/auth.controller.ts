import { Controller, Get, Post, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { Auth, GetUser, RawHeader, RoleProtected } from './decorators';

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags("Auth")
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

  @Get("check-status")
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService. checkAuthStatus(user);
  }



  @Get("private")
  @UseGuards(AuthGuard())
  testtingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser("email") userEmail: string,

    @RawHeader() rawHeader: string[],
    @Headers() headers: IncomingHttpHeaders,
  ){

    return {
      ok: true,
      message: "Hola mundo Private",
      user,
      userEmail,
      rawHeader
    }
  }

  @Get("private2")
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user,
    }
  }

  @Get("private3")
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user,
    }
  }

}
