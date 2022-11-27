import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class CreatePaperDto {

    @ApiProperty({
        type: String,
        example: "Article title"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly title: string;

    @ApiProperty({
        type: String,
        example: "This is a summary of the article"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly summary: string;

    @ApiProperty({
        type: String,
        example: "<p>This is the first paragraph of this article</p>"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly firstParagraph: string;

    @ApiProperty({
        type: String,
        example: "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly body: string;

    @ApiProperty({
        type: String,
        example: "Category"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly category: string;

    @ApiProperty({
        name: "author",
        type: Number,
        example: 1
    })
    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @Expose({ name: "author" })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly authorId: number


    @ApiProperty({
        name: "user",
        type: Number,
        example: 1
    })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @Expose({ name: "user" })
    readonly userId: number
}