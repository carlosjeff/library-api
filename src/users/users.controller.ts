import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/shared/decorators/role.decorator';
import { locationURL } from 'src/shared/functions/location-url';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from "./users.service";

@Controller()
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/user')
    public async create(@Body() createDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response): Promise<User> {

        try {
            const user: User = await this.userService.create(createDto);
            res.status(HttpStatus.CREATED)
                .location(locationURL(res, user.id))
            return new User(user);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Não foi possivel Criar User!',
            });
        }

    }

    @Role('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/user/:id')
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {

        const user = await this.userService.getById(id);

        if (!user) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'Não foi encontardo nenhum Pessoa!'
            });
        }

        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/users/:filter?')
    public async getAll(@Param('filter') filter?: string): Promise<User[]> {

        try {
            return await this.userService.getAll(filter);

        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Não foi possivel buscar User!',
            });
        }
    }


    @Put('/user/:id')
    public async update(@Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUserDto,
        @Res({ passthrough: true }) res: Response) {

        try {
            await this.userService.update(id, updateDto);
            res.status(HttpStatus.OK)
                .location(locationURL(res, id));
            return;

        } catch (error) {

            if (error.statusCode === 500) {
                throw new InternalServerErrorException({
                    statusCode: 500,
                    message: 'Não foi possivel atualizar o User!',
                });
            }
            throw error.response;
        }

    }

    @Delete('/user/:id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {

        try {

            const deleteUser = await this.userService.delete(id);
            return deleteUser;

        } catch (error) {
            if (error.statusCode === 500) {
                throw new InternalServerErrorException({
                    statusCode: 500,
                    message: 'Não foi possivel Deletar o User!',
                });
            }
            throw error.response;
        }
    }


}
