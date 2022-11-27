import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";
import { PasswordConfirm } from "src/shared/validations/password-confirm.validation";
import { TypesOfRoles } from "src/shared/validations/typesOfRoles.validation";

export class UpdateUserDto {


    @ApiProperty({
        type: String,
        example: "Carlos Jefferson Braga Alves",
        required: false
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    readonly name?: string;


    @ApiProperty({
        type: String,
        example: "default",
        required: false
    })
    @Validate(TypesOfRoles)
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(20, { message: ErrorMessageHelper.validator.maxLength })
    @IsOptional()
    readonly role?: string;
}

export class PasswordDto {

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
        example: "Qwe123!@#"
    })
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @MaxLength(50, { message: ErrorMessageHelper.validator.maxLength })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: ErrorMessageHelper.validator.isPassword })
    @Validate(PasswordConfirm)
    readonly confirmPassword: string;
}