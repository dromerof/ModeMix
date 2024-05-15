import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GetUser, RawHeader } from './decorators';

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';

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

}
