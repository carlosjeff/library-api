import { Injectable } from '@nestjs/common';
import { Payload } from 'src/shared/models/payload';
import { HashService } from 'src/shared/services/hash.service';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private hashService: HashService) { }


    public async login(data: AuthDto) {
        return this.userService.getByEmail(data.email).then(async (result: User) => {
            console.log(result);
            if (result) null

            if (this.hashService.compare(data.password, result.password)) {
                const payload: Payload = {
                    sub: result.name,
                    email: result.email,
                    role: result.role,
                    dateToken: new Date().toUTCString().toString()
                };
                return payload;
            } else {
                return null;
            }

        })
    }
}
