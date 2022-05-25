import { IsNotEmpty, Matches } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty({
        message: 'Informe o token.',
    })
    token: string;

    @IsNotEmpty({
        message: 'Informe a nova senha.',
    })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
        message: 'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
    })
    password: string;
}