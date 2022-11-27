import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class UpdateAuthorDto {

    @ApiProperty({
        type: String,
        example: "Carlos Jefferson Braga Alves",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    readonly name: string;

    @ApiProperty({
        type: String,
        example: "https://picsum.photos/200/300",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(150, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    readonly picture: string;

}