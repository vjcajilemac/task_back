import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { RegisterDto } from './dto/register.dto';
  import { JwtService } from '@nestjs/jwt';
  import * as bcryptjs from 'bcryptjs';
  
  import { LoginDto } from './dto/login.dto';
  import { UsersService } from '../users/users.service';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
    async register({
      password,
      email,
      first_name,
      last_name,
      username,
      authStrategy,
    }: RegisterDto) {
      const user = await this.usersService.findOneByEmail(email);
  
      if (user) {
        throw new BadRequestException('Email already exists');
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      return await this.usersService.createUser({
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
      });
    }
  
    async login({ email, password }: LoginDto) {
      const user = await this.usersService.findOneByEmail(email);
  
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }
  
      const isPasswordValid = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
  
      const payload = { email: user.email };
  
      const token = await this.jwtService.signAsync(payload);
  
      return {
        token: token,
        email: user.email,
      };
    }
  }
  