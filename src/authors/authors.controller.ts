import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/shared/decorators/role.decorator';
import { locationURL } from 'src/shared/functions/location-url';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { ErrorMessageHelper } from 'src/shared/helpers/error-message.helper';
import { roles } from 'src/shared/models/roles';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entity/author.entity';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller()
export class AuthorsController {

    private httpErrorMessage = ErrorMessageHelper.http('Author');

    constructor(private readonly authorsService: AuthorsService) { }

    @Role(roles.admin)
    @Post('/author')
    public async create(@Body() createDto: CreateAuthorDto,
        @Res({ passthrough: true }) res: Response): Promise<Author> {

        try {
            const author: Author = await this.authorsService.create(createDto);
            res.status(HttpStatus.CREATED).location(locationURL(res, author.id));

            return author;
        } catch (error) {
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('CREATE')
            );
        }

    }

    @Role(roles.default)
    @Get('/authors/:filter?')
    public async getAll(@Param('filter') filter: string): Promise<Author[]> {

        try {
            return await this.authorsService.getAll(filter);

        } catch (error) {
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('GET')
            );
        }

    }

    @Role(roles.default)
    @Get('/author/:id')
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<Author> {

        const author = await this.authorsService.getById(id);

        if (!author) {
            throw new NotFoundException(this.httpErrorMessage.notFound);
        }

        return author;
    }

    @Role(roles.admin)
    @Put('/author/:id')
    public async update(@Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateAuthorDto,
        @Res({ passthrough: true }) res: Response): Promise<void> {

        try {
            await this.authorsService.update(id, updateDto);
            res.status(HttpStatus.OK)
                .location(locationURL(res, id));
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
    @Delete('/author/:id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {

        try {
            const deleteAuthor = await this.authorsService.delete(id)
            return deleteAuthor;
        } catch (error) {
            if (error.statusCode === 500) {
                throw new InternalServerErrorException(
                    this.httpErrorMessage.internalServerError('DELETE')
                );
            }
            throw error.response;
        }

    }

}
