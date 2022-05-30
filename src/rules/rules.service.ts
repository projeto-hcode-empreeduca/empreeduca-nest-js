import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(private readonly database: DataBaseService) {}

  create(data: CreateRuleDto) {
    return this.database.rule.create({
      data,
    });
  }

  findAll() {
    return this.database.rule.findMany();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Informe um ID válido.');
    }

    const rule = await this.database.rule.findUnique({
      where: {
        id,
      },
    });

    if (!rule) {
      throw new NotFoundException('Cargo não encontrado.');
    }

    return rule;
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    await this.findOne(id);

    return this.database.rule.update({
      data: updateRuleDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.database.rule.delete({
      where: {
        id,
      },
    });
  }
}
