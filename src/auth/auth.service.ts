import { NotFoundException, BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(data: CreateUserDto) {

    const newUser = await this.usersService.create(data);

    return this.mailService.send({
      to: newUser.email,
      subject: 'Novo usuário - Sistema Hcode / Empreeduca',
      html: `
        <h1>Olá ${newUser.person.name}, seja bem-vindo ao nosso sistema!!!</h1>
        <p style="font-size: 14px;">Seu cadastro foi processado com sucesso!!!</p>
      `,
    });

  }

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
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const forgetToken = this.jwtService.sign(
      {
        id: user.id,
      },
      { expiresIn: '1h' },
    );

    return this.mailService.send({
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <h1>Olá ${user.person.name}, tudo bem?</h1>
        <p>Você solicitou a recuperação da sua senha. Por favor, clique no link abaixo para redefini-la.</p>
        <a href="https://hcode.com.br/auth/new-password?token=${forgetToken}">https://hcode.com.br/auth/new-password?token=${forgetToken}</a>
      `,
    });
  }

  async resetPassword({
    token,
    password,
  }: ResetPasswordDto) {

    try {
      await this.jwtService.verify(token);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }

    const { id } = this.jwtService.decode(token) as {
      id: number;
    };

    const user = await this.usersService.updatePassword(id, password);

    delete user.password;

    return this.mailService.send({
      to: user.email,
      subject: 'Senha redefinida com sucesso!',
      html: `
        <h2>Olá ${user.person.name}. Sua senha foi redefinida com sucesso!</h2>
        <p style="font-size: 20px;">Fique à vontade para entrar em contato conosco em caso de dúvidas.</p>
        <p style="font-size: 17px;">Atenciosamente,</p>
        <p style="font-size: 17px;">Equipe Hcode</p>
      `,
    });

  }

  async changePassword(id: number, {
    currentPassword,
    newPassword,
    confirmPassword,
  }: ChangePasswordDto) {

    // 1 - Verificar se a senha atual está correta
    const user = await this.usersService.getById(id);

    if (!await bcrypt.compare(currentPassword, user.password)) {
      throw new BadRequestException('Senha incorreta.');
    }

    // 2 - Verificar se a nova senha combina com a senha de confirmação
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('As novas senhas não são iguais.');
    }

    // 3 - Atualizar a senha
    const updatedUser = await this.usersService.updatePassword(user.id, newPassword);

    delete updatedUser.password;

    return updatedUser;

  }

}
