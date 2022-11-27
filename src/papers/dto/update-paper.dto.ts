import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class UpdatePaperDto {

    @ApiProperty({
        type: String,
        example: "Article title",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    title?: string;

    @ApiProperty({
        type: String,
        example: "This is a summary of the article",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    summary?: string;

    @ApiProperty({
        type: String,
        example: "<p>This is the first paragraph of this article</p>",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    firstParagraph?: string;

    @ApiProperty({
        type: String,
        example: "<div><p>Second paragraph</p><p>Third paragraph</p></div>",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    body?: string;

    @ApiProperty({
        type: String,
        example: "Category",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    category?: string;

    @ApiProperty({
        name: "author",
        type: Number,
        example: 1,
        required: false
    })
    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @IsOptional()
    @Expose({ name: "author" })
    authorId?: number;
}
