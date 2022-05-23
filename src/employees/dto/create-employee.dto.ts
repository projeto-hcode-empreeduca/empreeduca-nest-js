import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty({
        message: 'O nome do funcionário é obrigatório.',
    })
    name: string;
    
    @IsNotEmpty({
        message: 'O salário do funcionário é obrigatório.',
    })
    salary: number;
    
    @IsNotEmpty({
        message: 'A moeda é obrigatória.',
    })
    coinId: number;
    
    @IsNotEmpty({
        message: 'O cargo é obrigatório.',
    })
    ruleId: number;
    
    @IsNotEmpty({
        message: 'A data de início é obrigatória.',
    })
    startAt: Date;
    
    @IsNotEmpty({
        message: 'O CPF é obrigatório.',
    })
    cpf: string;
    
    @IsNotEmpty({
        message: 'O telefone é obrigatório.',
    })
    phone: string;

    @IsNotEmpty({
        message: 'A data de nascimento do funcionário é obrigatória.',
    })
    birthAt: Date;
}
