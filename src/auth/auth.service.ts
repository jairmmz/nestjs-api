import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login({ email, password }: LoginDto) {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            token
        }
    }

    async register({ name, email, password }: RegisterDto) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
        });

        return {
            message: 'User registered successfully'
        }
    }

    // async logout(@Request() request: any) {
    //     await request.session.destroy();
    //     return { message: 'User logged out successfully' };
    // }

    async profile({ email }: { email: string }) {
        return await this.userService.findOneByEmail(email);
    }

}
