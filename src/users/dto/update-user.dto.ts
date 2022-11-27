import { IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ErrorMessageHelper } from "src/shared/helpers/error-message.helper";
import { PasswordConfirm } from "src/shared/validations/password-confirm.validation";
import { TypesOfRoles } from "src/shared/validations/typesOfRoles.validation";

export class UpdateUserDto {


    @IsString()
    @MaxLength(100)
    @MinLength(3)
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(100, { message: ErrorMessageHelper.validator.maxLength })
    @MinLength(3, { message: ErrorMessageHelper.validator.minLength })
    @IsOptional()
    readonly name?: string;


    @Validate(TypesOfRoles)
    @IsString()
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @MaxLength(20, { message: ErrorMessageHelper.validator.maxLength })
    @IsOptional()
    @MaxLength(20)
    readonly role?: string;
}

export class PasswordDto {

    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @MaxLength(50, { message: ErrorMessageHelper.validator.maxLength })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: ErrorMessageHelper.validator.isPassword })
    readonly password: string;
    @IsString({ message: ErrorMessageHelper.validator.isString })
    @IsNotEmpty({ message: ErrorMessageHelper.validator.isNotEmpty })
    @MaxLength(50, { message: ErrorMessageHelper.validator.maxLength })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/, { message: ErrorMessageHelper.validator.isPassword })
    @Validate(PasswordConfirm)
    readonly confirmPassword: string;
}