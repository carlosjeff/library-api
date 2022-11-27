import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entity/author.entity';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private readonly authorsRepository: Repository<Author>) { }


    public async create(createDto: CreateAuthorDto): Promise<Author> {

        return await this.authorsRepository.save(createDto);
    }

    public async getAll(filter?: string): Promise<Author[]> {

        if (filter) {
            return await this.authorsRepository.findBy({ name: Like(`%${filter}%`) });
        }

        return await this.authorsRepository.find();
    }

    public async getById(id: number): Promise<Author> {

        return await this.authorsRepository.findOne({ where: { id } });
    }

    public async update(id: number, updateDto: UpdateAuthorDto): Promise<UpdateResult> {

        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        return await this.authorsRepository.update({ id }, updateDto);
    }

    public async delete(id: number): Promise<string> {

        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        await this.authorsRepository.delete(id)

        return `O registro com o id ${id} foi deletada com sucesso!`;
    }

}
