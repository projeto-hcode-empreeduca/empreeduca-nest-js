import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({
    message: 'A rua é obrigatória.',
  })
  @MinLength(5, {
    message: 'A rua deve ter no mínimo 5 caracteres.',
  })
  street: string;

  @IsNotEmpty({
    message: 'O CEP é obrigatório.',
  })
  zipCode: string;

  @IsNotEmpty({
    message: 'O número é obrigatório',
  })
  number: string;

  complement: string;

  @IsNotEmpty({
    message: 'O bairro é obrigatório.',
  })
  district: string;

  @IsNotEmpty({
    message: 'A cidade é obrigatória.',
  })
  cityId: number;
}
