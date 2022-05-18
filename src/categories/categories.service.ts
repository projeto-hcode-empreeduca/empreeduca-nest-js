import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateCategoriesDto } from './dto/categories.create.dto';
import { UpdateCategoriesDto } from './dto/categories.update.dto';

@Injectable()
export class CategoriesService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateCategoriesDto) {
    if (!data.name) {
      throw new BadRequestException('Informe o nome da categoria.');
    }

    if (data.name.length < 3) {
      throw new BadRequestException(
        'Informe o nome da categoria com mais de 3 caracteres.',
      );
    }

    return data;
  }

  async create(data: CreateCategoriesDto) {
    this.validate(data);

    return this.db.movieCategory.create({
      data,
    });
  }

  async list() {
    return this.db.movieCategory.findMany();
  }

  async get(id: number) {
    const category = await this.db.movieCategory.findUnique({
      where: {
        id: this.getId(id),
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não existe.');
    }

    return category;
  }

  async update(id: number, data: UpdateCategoriesDto) {
    this.validate(data);

    return this.db.movieCategory.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.get(id);

    return this.db.movieCategory.delete({
      where: {
        id: this.getId(id),
      },
    });
  }

  getId(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    return id;
  }
}
