import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";
import { TypesOfRoles } from "src/shared/validations/typesOfRoles.validation";


export class CreateUserDto {

    @ApiProperty({
        type: String,
        example: "Carlos Jefferson Braga Alves"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly name: string;

    @ApiProperty({
        type: String,
        example: "exemplo@exemplo.com"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsEmail({ message: ErrorMessageHelper.validator.isEmail })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    readonly email: string;

    @ApiProperty({
        type: String,
        example: "Qwe123!@#"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @MaxLength(50, { message: ErrorMessageHelper.validator.maxLength })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: ErrorMessageHelper.validator.isPassword })
    readonly password: string;

    @ApiProperty({
        type: String,
        example: "default"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @MaxLength(20, { message: ErrorMessageHelper.validator.maxLength })
    @Validate(TypesOfRoles)
    readonly role: string;
}