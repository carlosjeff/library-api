import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { Paper } from './entity/paper.entity';

@Injectable()
export class PapersService {

    constructor(@InjectRepository(Paper) private readonly papersRepository: Repository<Paper>) { }

    public async create(createDto: CreatePaperDto): Promise<Paper> {

        return await this.papersRepository.save(createDto);
    }

    public async getAll(filter?: string): Promise<Paper[]> {

        if (filter) {
            return await this.papersRepository.find({
                where: { title: Like(`%${filter}%`) },
                relations: { author: true }
            });
        }

        return await this.papersRepository.find({ relations: { author: true } });
    }

    public async getById(id: number): Promise<Paper> {

        return await this.papersRepository.findOne({ where: { id }, relations: { author: true } });
    }

    public async update(id: number, updateDto: UpdatePaperDto): Promise<UpdateResult> {

        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        return await this.papersRepository.update({ id }, updateDto);
    }

    public async delete(id: number): Promise<string> {

        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        await this.papersRepository.delete(id)

        return `O registro com o id ${id} foi deletada com sucesso!`;
    }

}
