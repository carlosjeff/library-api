import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/shared/services/hash.service';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        HashService
    ],
    exports: [UsersService]
})
export class UsersModule { }
