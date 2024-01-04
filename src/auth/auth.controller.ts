import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { LoginDto } from './dto/login.dto';
  import { RegisterDto } from './dto/register.dto';
  import { AuthService } from './auth.service';
  import { AuthGuard } from './guard/auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }
  
    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req) {
      return req.user;
    }
  }
  