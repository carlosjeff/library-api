import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { HashService } from 'src/shared/services/hash.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.TIME_TOKEN },
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [AuthService, HashService, EncryptionService, JwtStrategy]
})
export class AuthModule { }
