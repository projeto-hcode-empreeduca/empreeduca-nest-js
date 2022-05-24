import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login({ email, password }: LoginDto) {
    // 1 - Verificar se existe um usuário com o email informado
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário ou senha inválido.');
    }

    // 2 - Verificar se a senha está correta
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new BadRequestException('Usuário ou senha inválido.');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.person.name,
    });

    delete user.password;

    return {
      user,
      accessToken,
    };
  }

  async forget(email: string) {
    const { id } = await this.usersService.getByEmail(email);

    const forgetToken = this.jwtService.sign(
      {
        id,
      },
      { expiresIn: '1h' },
    );

    return this.mailService.send({
      to: email,
      html: '',
    });
  }
}
