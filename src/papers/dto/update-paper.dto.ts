import { Expose } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class UpdatePaperDto {

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    title?: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    summary?: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    firstParagraph?: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    body?: string;

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    category?: string;

    @IsInt({ message: ErrorMessageHelper.validator.isInt })
    @Min(1, { message: ErrorMessageHelper.validator.min })
    @IsOptional()
    @Expose({ name: "author" })
    authorId?: number;
}
