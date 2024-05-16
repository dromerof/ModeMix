import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiResponse({ status: 201, description: 'User registration successful.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: 'Login user.' })
  @ApiResponse({ status: 200, description: 'User login successful.' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get("check-status")
  @ApiOperation({ summary: 'Check authentication status.' })
  @ApiResponse({ status: 200, description: 'Authentication status retrieved successfully.' })
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService. checkAuthStatus(user);
  }

  @Get("private")
  @ApiOperation({ summary: 'Testing private route.' })
  @ApiResponse({ status: 200, description: 'Private route testing successful.' })
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
  @ApiOperation({ summary: 'Access private route with specific roles.' })
  @ApiResponse({ status: 200, description: 'Access to private route successful.' })
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
  @ApiOperation({ summary: 'Access private route with admin role.' })
  @ApiResponse({ status: 200, description: 'Access to private route successful.' })
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
