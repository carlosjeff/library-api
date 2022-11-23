import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from "passport-jwt";
dotenv.config();

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        });
    }

    public async validate(payload: any) {
        if (!payload) throw new UnauthorizedException()

        return JSON.stringify(payload)
    }
}