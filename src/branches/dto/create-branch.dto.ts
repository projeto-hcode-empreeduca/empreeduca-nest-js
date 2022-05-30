import { IsNotEmpty } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty({
    message: 'O nome da filial é obrigatório.',
  })
  name: string;

  @IsNotEmpty({
    message: 'O estado da filial é obrigatório.',
  })
  stateId: number;
}
