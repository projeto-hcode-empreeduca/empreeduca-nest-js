import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuário.',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'Informe a filial do usuário.',
  })
  branchId: number;

  @IsNotEmpty({
    message: 'Informe o email do usuário.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha.',
  })
  @MinLength(8, {
    message: 'A senha deve ter no mínimo 8 caracteres.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
    message:
      'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  })
  password: string;

  @IsOptional()
  photo: string;
}
