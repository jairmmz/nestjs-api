import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from '../enums/rol.enum';
import { Auth } from 'src/decorators/auth.decorator';

interface RequestWithUser extends Request {
    user: {
        email: string,
        role: string
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    // @Post('Logout')
    // @UseGuards(AuthGuard)
    // logout(@Request() request: any) {
    //     return this.authService.logout(request)
    // }

    @Get('profile')
    @Auth(Role.Admin)
    profile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user);
    }

}
