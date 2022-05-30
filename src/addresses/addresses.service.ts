import { Injectable, NotFoundException } from '@nestjs/common';
import { CitiesService } from 'src/cities/cities.service';
import { DataBaseService } from 'src/database/database.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    private database: DataBaseService,
    private citiesService: CitiesService,
  ) {}

  async list() {
    return this.database.address.findMany();
  }

  async getById(id: number) {
    id = Number(id);

    const address = await this.database.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    return address;
  }

  async create({
    street,
    number,
    complement,
    district,
    zipCode,
    cityId,
  }: CreateAddressDto) {
    await this.citiesService.getById(cityId);

    return this.database.address.create({
      data: {
        street,
        number,
        complement,
        district,
        zipCode,
        city: {
          connect: {
            id: Number(cityId),
          },
        },
      },
    });
  }
}
