import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetTokenValues } from 'src/shared/decorators/get-token.decorator';
import { Role } from 'src/shared/decorators/role.decorator';
import { locationURL } from 'src/shared/functions/location-url';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { ErrorMessageHelper } from 'src/shared/helpers/error-message.helper';
import { Payload } from 'src/shared/models/payload';
import { roles } from 'src/shared/models/roles';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from "./users.service";

@Controller()
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {

    private httpErrorMessage = ErrorMessageHelper.http('Author');

    constructor(private readonly userService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Role(roles.admin)
    @Post('/user')
    public async create(@Body() createDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response): Promise<User> {

        try {
            const user: User = await this.userService.create(createDto);
            res.status(HttpStatus.CREATED)
                .location(locationURL(res, user.id))
            return new User(user);
        } catch (error) {
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('CREATE')
            );
        }

    }

    @Role('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Role(roles.admin)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/user/:id')
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {

        const user = await this.userService.getById(id);

        if (!user) {
            throw new NotFoundException(
                this.httpErrorMessage.internalServerError('GET')
            );
        }

        return user;
    }

    @Role(roles.admin)
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
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('GET')
            );
        }
    }

    @Role(roles.admin, roles.default)
    @Put('/user/password')
    public async updatePassword(@Body() Password: PasswordDto,
        @GetTokenValues() paylod: Payload) {
        console.log(paylod);
        try {
            await this.userService.updatePassword(paylod.email, Password);
            return;

        } catch (error) {

            if (error.statusCode === 500) {
                throw new InternalServerErrorException(
                    this.httpErrorMessage.internalServerError('UPDATE')
                );
            }
            throw error.response;
        }

    }

    @Role(roles.admin)
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
                throw new InternalServerErrorException(
                    this.httpErrorMessage.internalServerError('UPDATE')
                );
            }
            throw error.response;
        }

    }

    @Role(roles.admin)
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
                throw new InternalServerErrorException(
                    this.httpErrorMessage.internalServerError('DELETE')
                );
            }
            throw error.response;
        }
    }


}
