import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";


export class CreateAuthorDto {

    @ApiProperty({
        type: String,
        example: "Carlos Jefferson Braga Alves"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.maxLength })
    readonly name: string;

    @ApiProperty({
        type: String,
        example: "https://picsum.photos/200/300"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(150, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly picture: string;

}