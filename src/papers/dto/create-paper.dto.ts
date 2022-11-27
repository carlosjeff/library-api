import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class CreatePaperDto {

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly title: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly summary: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly firstParagraph: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly body: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly category: string;

    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @Expose({ name: "author" })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly authorId: number


    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @Expose({ name: "user" })
    readonly userId: number
}