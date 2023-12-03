import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../common/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';

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
    @Auth(Role.User)
    profile(@ActiveUser() user: IUserActive) {
        return this.authService.profile(user);
    }

}
