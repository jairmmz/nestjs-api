import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

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
    @UseGuards(AuthGuard)
    profile(@Request() req: any) {
        return req.user;
    }

}
