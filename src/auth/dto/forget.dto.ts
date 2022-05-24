import { IsNotEmpty } from 'class-validator';

export class ForgetDto {
  @IsNotEmpty({
    message: 'Informe o email.',
  })
  email: string;
}
