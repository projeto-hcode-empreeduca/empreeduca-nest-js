import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { StatesService } from '../states/states.service';

@Injectable()
export class BranchesService {

  // Método executado no momento em que a classe é instanciada
  constructor(
    private readonly database: DataBaseService,
    private readonly statesService: StatesService,
  ) {}

  async create(data: CreateBranchDto) {

    data.stateId = Number(data.stateId);

    await this.statesService.getById(data.stateId);

    return this.database.branche.create({
      data,
    });

  }

  async findAll() {
    return this.database.branche.findMany({
      select: {
        id: true,
        name: true,
        state: {
          select: {
            id: true,
            name: true,
            uf: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {

    if (isNaN(id)) {
      throw new BadRequestException('Informe um ID válido.');
    }

    const branch = await this.database.branche.findUnique({
      include: {
        state: true,
      },
      where: {
        id,
      },
    });

    if (!branch) {
      throw new NotFoundException('Filial não encontrada.');
    }

    return branch;

  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    
    if (isNaN(id)) {
      throw new BadRequestException('Informe um ID válido.');
    }

    await this.findOne(id);

    if (updateBranchDto.stateId) {
      updateBranchDto.stateId = Number(updateBranchDto.stateId);
    }

    return this.database.branche.update({
      data: updateBranchDto,
      where: {
        id,
      },
    });

  }

  async remove(id: number) {
    
    if (isNaN(id)) {
      throw new BadRequestException('Informe um ID válido.');
    }

    await this.findOne(id);

    return this.database.branche.delete({
      where: {
        id,
      },
    });

  }
}
