import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([User]),
    
    PassportModule.register({defaultStrategy: "jwt"}),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log("JWT SECRET", configService.get("JWT_SECRET"));
        // console.log("JWT SECRET", process.env.JWT_SECRET);
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: {
          expiresIn: "2h"
          }
        }
      }
    })


    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: "2h"
    //   }
    // })
  
  ],
  exports: [
    AuthService,
    TypeOrmModule,
  ]
})
export class AuthModule {}
