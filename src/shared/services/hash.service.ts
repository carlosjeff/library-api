import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

    public async hashing(password: string): Promise<string> {
        const saltOrRounds = await bcrypt.genSalt();;
        return await bcrypt.hash(password, saltOrRounds);;
    }

    public async compare(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}
