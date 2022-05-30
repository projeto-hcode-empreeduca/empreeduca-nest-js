import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private db: DataBaseService) {}

  async list() {
    return this.db.city.findMany();
  }

  async getById(id: number) {
    id = Number(id);

    const city = await this.db.city.findUnique({
      where: {
        id,
      },
    });

    if (!city) {
      throw new NotFoundException('Cidade não encontrada.');
    }

    return city;
  }

  async create(data: CreateCityDto) {
    if (!data.name) {
      throw new BadRequestException('O nome da cidade é obrigatório.');
    }

    if (!data.stateId) {
      throw new BadRequestException('O estado é obrigatório.');
    }

    data.stateId = Number(data.stateId);

    return this.db.city.create({
      data,
    });
  }

  async update(data: UpdateCityDto, id: number) {
    const city = await this.getById(id);

    if (data.stateId) {
      data.stateId = Number(data.stateId);
    }

    return this.db.city.update({
      data,
      where: {
        id: city.id,
      },
    });
  }

  async delete(id: number) {
    const city = await this.getById(id);

    return this.db.city.delete({
      where: {
        id: city.id,
      },
    });
  }
}
