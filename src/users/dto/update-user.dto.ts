import { IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { TypesOfRoles } from "src/shared/validations/typesOfRoles.validation";

export class UpdateUserDto {


    @IsString()
    @MaxLength(100)
    @MinLength(3)
    @IsOptional()
    readonly name?: string;


    @Validate(TypesOfRoles)
    @IsString()
    @IsOptional()
    @MaxLength(20)
    readonly role?: string;

}