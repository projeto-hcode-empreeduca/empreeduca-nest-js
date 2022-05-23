import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { differenceInYears } from 'date-fns';
import { CoinsService } from 'src/coins/coins.service';
import { DataBaseService } from 'src/database/database.service';
import { RulesService } from 'src/rules/rules.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  constructor(
    private readonly database: DataBaseService,
    private coinsService: CoinsService,
    private rulesService: RulesService,
  ) {}

  async create({
    name,
    salary,
    coinId,
    ruleId,
    birthAt,
    cpf,
    phone,
    startAt,
  }: CreateEmployeeDto) {

    await this.coinsService.getById(coinId);
    await this.rulesService.findOne(+ruleId);

    if (String(startAt) === 'Invalid Date') {
      throw new BadRequestException('Informe uma data de início válida.');
    }

    const birthYear = new Date(birthAt);

    if (String(birthYear) === 'Invalid Date') {
      throw new BadRequestException('Informe uma data de nascimento válida.');
    }

    const yearsOld = differenceInYears(new Date(), birthYear);

    const regex = new RegExp(/[0-9]/g);

    const resultCpf = [...cpf.matchAll(regex)].join('');

    return this.database.employee.create({
      data: {
        salary,
        birthAt: new Date(birthAt),
        cpf: resultCpf,
        phone,
        startAt: new Date(startAt),
        yearsOld,
        person: {
          create: {
            name,
          },
        },
        coin: {
          connect: {
            id: Number(coinId),
          },
        },
        rule: {
          connect: {
            id: Number(ruleId),
          },
        },
      },
    });

  }

  findAll() {
    return this.database.employee.findMany({
      include: {
        person: true,
        coin: true,
        rule: true,
      },
    });
  }

  async findOne(id: number) {

    const employee = await this.database.employee.findUnique({
      where: {
        id,
      },
      include: {
        person: true,
        rule: true,
        coin: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado.');
    }

    return employee;

  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    
    await this.findOne(id);

    return this.database.employee.delete({
      where: {
        id,
      },
    });

  }
}
