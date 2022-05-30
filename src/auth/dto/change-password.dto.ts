import { IsNotEmpty, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({
    message: 'Informe a senha atual.',
  })
  currentPassword: string;

  @IsNotEmpty({
    message: 'Informe a nova senha.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
    message:
      'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  })
  newPassword: string;

  @IsNotEmpty({
    message: 'Informe a nova senha.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
    message:
      'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  })
  confirmPassword: string;
}
