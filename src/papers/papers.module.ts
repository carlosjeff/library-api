import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paper } from './entity/paper.entity';
import { PapersController } from './papers.controller';
import { PapersService } from './papers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Paper])],
    controllers: [PapersController],
    providers: [
        PapersService,


    ],
})
export class PapersModule { }
