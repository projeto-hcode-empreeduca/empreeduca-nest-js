import { IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    name: string;

    @IsOptional()
    branchId: number;
    
    @IsOptional()
    email: string;
}