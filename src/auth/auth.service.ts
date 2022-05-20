import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async login({
        email,
        password,
    }: LoginDto) {

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

        return {
            success: true,
        };

    }

}
