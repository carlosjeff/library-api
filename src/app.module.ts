import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entity/author.entity';
import { Paper } from './papers/entity/paper.entity';
import { PapersModule } from './papers/papers.module';
import { UserThrottlerGuard } from './shared/guards/user-throttler.guard';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      entities: [User, Author, Paper],
      synchronize: true
    }),
    PapersModule,
    AuthorsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService],
    {
      provide: APP_GUARD,
      useClass: UserThrottlerGuard
    }
  ],
})
export class AppModule { }
