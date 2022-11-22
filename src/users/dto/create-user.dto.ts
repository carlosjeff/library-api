import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { TypesOfRoles } from "src/shared/validations/typesOfRoles.validation";


export class CreateUserDto {

    @IsString()
    @MaxLength(100)
    @MinLength(3)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(100)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Validate(TypesOfRoles)
    readonly role: string;
}