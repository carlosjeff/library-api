import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AuthDto {

    @ApiProperty({
        type: String,
        example: "exemplo@exemplo.com"
    })
    @IsString()
    email: string

    @ApiProperty({
        type: String,
        example: "Qwe123!@#"
    })
    @IsString()
    password: string
}