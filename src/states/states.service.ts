import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { verifyDataObject } from 'src/utils/verify-data-object';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StatesService {
  constructor(private db: DataBaseService) {}

  async listStates() {
    return this.db.state.findMany();
  }

  async getById(id: number) {
    id = Number(id);

    const state = await this.db.state.findUnique({
      where: {
        id,
      },
    });

    if (!state) {
      throw new NotFoundException('Estado não encontrado.');
    }

    return state;
  }

  async create(data: CreateStateDto) {
    if (!data.name) {
      throw new BadRequestException('O nome do estado é obrigatório.');
    }

    if (!data.uf) {
      throw new BadRequestException('O UF é obrigatório.');
    }

    return this.db.state.create({
      data,
    });
  }

  async update(data: UpdateStateDto, id: number) {
    const state = await this.getById(id);

    const dataUpdate: UpdateStateDto = {};

    if (data.name) {
      dataUpdate.name = data.name;
    }

    if (data.uf) {
      dataUpdate.uf = data.uf;
    }

    verifyDataObject(dataUpdate, 'Informe pelo menos um dado do estado.');

    return this.db.state.update({
      data: dataUpdate,
      where: {
        id: state.id,
      },
    });
  }

  async delete(id: number) {
    const state = await this.getById(id);

    return this.db.state.delete({
      where: {
        id: state.id,
      },
    });
  }
}
