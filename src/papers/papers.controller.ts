import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/shared/decorators/role.decorator';
import { locationURL } from 'src/shared/functions/location-url';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { ErrorMessageHelper } from 'src/shared/helpers/error-message.helper';
import { roles } from 'src/shared/models/roles';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { Paper } from './entity/paper.entity';
import { PapersService } from './papers.service';

@Controller()
@UseGuards(JwtAuthGuard, RoleGuard)
export class PapersController {

    private httpErrorMessage = ErrorMessageHelper.http('Paper');

    constructor(private readonly papersService: PapersService) { }

    @Role(roles.admin)
    @Post('/paper')
    public async create(@Body() createDto: CreatePaperDto,
        @Res({ passthrough: true }) res: Response): Promise<Paper> {
        try {

            const paper: Paper = await this.papersService.create(createDto)
            res.status(HttpStatus.CREATED).location(locationURL(res, paper.id));

            return paper;
        } catch (error) {
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('CREATE')
            )
        }
    }

    @Role(roles.default)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/papers/:filter?')
    public async getAll(@Param('filter') filter?: string): Promise<Paper[]> {

        try {
            return await this.papersService.getAll(filter);

        } catch (error) {
            throw new InternalServerErrorException(
                this.httpErrorMessage.internalServerError('GET')
            );
        }
    }

    @Role(roles.default)
    @Get('/paper/:id')
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<Paper> {

        const paper = await this.papersService.getById(id);

        if (!paper) {
            throw new NotFoundException(this.httpErrorMessage.notFound);
        }

        return paper;
    }

    @Role(roles.admin)
    @Put('/paper/:id')
    public async update(@Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdatePaperDto,
        @Res({ passthrough: true }) res: Response): Promise<void> {

        try {
            await this.papersService.update(id, updateDto);
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
    @Delete('/paper/:id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {

        try {
            const deletePaper = await this.papersService.delete(id);
            return deletePaper;;
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
