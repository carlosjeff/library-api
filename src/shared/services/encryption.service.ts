
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import * as dotenv from 'dotenv';
import { promisify } from 'util';
dotenv.config();

const iv = Buffer.alloc(16, 256);

@Injectable()
export class EncryptionService {

    private password = process.env.PASSWORD


    constructor() { }



    public async encrypt(data: string) {

        const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const encryptedText = Buffer.concat([
            cipher.update(data),
            cipher.final(),
        ]);
        return encryptedText;
    }

    public async decrypt(data: any) {

        const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;

        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        const decryptedText = Buffer.concat([
            decipher.update(data),
            decipher.final(),
        ]);

        return decryptedText.toString();
    }

    async info(token: any): Promise<any> {
        const JSONB = require('json-buffer')
        return await this.decrypt(JSONB.parse(token.data)).then(async result => {
            return {
                "data": JSON.parse(result),
                "iat": token.iat,
                "exp": token.exp
            };
        })
    }
}
