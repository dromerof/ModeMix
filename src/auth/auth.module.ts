import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  exports: [
    AuthService,
    TypeOrmModule,
  ]
})
export class AuthModule {}
