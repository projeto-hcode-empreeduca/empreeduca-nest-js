import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { verifyDataObject } from 'src/utils/verify-data-object';
import { CoinsCreateDto } from './dto/coins.create.dto';
import { CoinsUpdateDto } from './dto/coins.update.dto';

@Injectable()
export class CoinsService {
  constructor(private database: DataBaseService) {}

  listCoins() {
    return this.database.coin.findMany();
  }

  async getById(id: number) {
    id = Number(id);

    const coin = await this.database.coin.findUnique({
      where: {
        id,
      },
    });

    if (!coin) {
      throw new NotFoundException('Moeda não encontrada.');
    }

    return coin;
  }

  async create(data: CoinsCreateDto) {
    if (!data.name) {
      throw new BadRequestException('O nome da moeda é obrigatório.');
    }

    if (!data.code) {
      throw new BadRequestException('O código da moeda é obrigatório.');
    }

    return this.database.coin.create({
      data,
      select: {
        id: true,
        name: true,
        code: true,
      },
    });
  }

  async update(data: CoinsUpdateDto, coinId: number) {
    coinId = Number(coinId);

    await this.getById(coinId);

    const { name, code } = data;

    const updateData: CoinsUpdateDto = {};

    if (name) {
      updateData.name = name;
    }

    if (code) {
      updateData.code = code;
    }

    verifyDataObject(updateData);

    return this.database.coin.update({
      data: updateData,
      where: {
        id: coinId,
      },
    });
  }

  async delete(id: number) {
    id = Number(id);

    await this.getById(id);

    return this.database.coin.delete({
      where: {
        id,
      },
    });
  }
}
