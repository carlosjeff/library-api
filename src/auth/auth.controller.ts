import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly encryptionService: EncryptionService) { }


    @Post('/auth/login')
    public async login(@Body() user: AuthDto) {
        return await this.authService.login(user).then(async result => {
            if (result.email) {
                // return { "token": this.jwtService.sign(result) }
                return await this.encryptionService.encrypt(JSON.stringify(result))
                    .then(async (resultData) => {
                        var JSONB = require('json-buffer');
                        var Buffer = require('buffer').Buffer
                        const payload = { data: JSONB.stringify(Buffer.from(resultData)) }
                        return { "token": this.jwtService.sign(payload) };
                    });
            } else {
                return result;
            }
        })
    }
}
