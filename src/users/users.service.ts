import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/shared/services/hash.service';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly hashService: HashService) { }

    public async create(createDto: CreateUserDto): Promise<User> {

        return this.hashService.hashing(createDto.password)
            .then(hash =>
                this.usersRepository.save({ ...createDto, password: hash }));
    }

    public async getAll(filter?: string): Promise<User[]> {
        if (filter) {
            return await this.usersRepository
                .findBy({ name: Like(`%${filter}%`) })
        }
        return await this.usersRepository.find();

    }

    public async getById(id: number): Promise<User> {

        return await this.usersRepository.findOne({ where: { id } });
    }

    public async getByEmail(email: string): Promise<User> {

        return await this.usersRepository.findOne({ where: { email } });
    }

    public async update(id: number, updateDto: UpdateUserDto): Promise<UpdateResult> {

        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        return await this.usersRepository.update({ id }, updateDto)

    }

    public async delete(id: number): Promise<string> {
        if (!(await this.getById(id))) throw new NotFoundException(`Id ${id} não encontrado`);

        await this.usersRepository.delete(id)

        return `O registro com o id ${id} foi deletada com sucesso!`;
    }

}
