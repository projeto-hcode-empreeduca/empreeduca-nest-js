import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetDto } from './dto/forget.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('forget')
  async forget(@Body() { email }: ForgetDto) {
    return this.authService.forget(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async profile(@Body() body: UpdateUserDto, @Req() req) {
    return this.usersService.update(req.auth.id, body);
  }

  @UseGuards(AuthGuard)
  @Put('password')
  async changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(req.auth.id, body);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './storage',
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  @Put('photo')
  async uploadPhoto(@UploadedFile() image: Express.Multer.File, @Req() req) {
    return this.usersService.setPhoto(image, req.auth.id);
  }

  @UseGuards(AuthGuard)
  @Get('photo')
  async showPhoto(@Req() req, @Response({ passthrough: true }) response) {
    return this.usersService.getPhoto(req.auth.id, response);
  }
}
