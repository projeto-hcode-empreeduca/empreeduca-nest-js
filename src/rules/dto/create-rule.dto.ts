import { IsNotEmpty } from "class-validator";

export class CreateRuleDto {
    @IsNotEmpty({
        message: 'O nome do cargo é obrigatório.',
    })
    name: string;
}
