import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(private database: DataBaseService) {}

  async getByEmail(email: string) {
    const user = await this.database.user.findUnique({
      where: {
        email,
      },
      include: {
        person: true,
      },
    });

    return user;
  }

  async create({ name, email, password, branchId }: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);

    return this.database.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        branche: {
          connect: {
            id: Number(branchId),
          },
        },
        person: {
          create: {
            name,
          },
        },
      },
      include: {
        person: true,
      },
    });
  }

  async update(id: number, { email, name, branchId }: UpdateUserDto) {
    const user = await this.getById(id);

    const userEmail = await this.getByEmail(email);

    if (userEmail && userEmail.id !== user.id) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const updatedUser = await this.database.user.update({
      data: {
        email,
        person: {
          update: {
            name,
          },
        },
        branche: {
          connect: {
            id: Number(branchId),
          },
        },
      },
      where: {
        id: user.id,
      },
      include: {
        person: true,
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async getById(id: number) {
    id = Number(id);

    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async updatePassword(id: number, password: string) {
    await this.getById(id);

    const salt = bcrypt.genSaltSync(10);

    return this.database.user.update({
      data: {
        password: bcrypt.hashSync(password, salt),
      },
      where: {
        id,
      },
      include: {
        person: true,
      },
    });
  }

  getStoragePath(file: string) {
    if (!file) {
      throw new BadRequestException('O arquivo é obrigatório.');
    }

    const path = join(__dirname, '../', '../', '../', 'storage', file);

    return path;
  }

  async removePhoto(id: number) {
    const user = await this.getById(id);

    if (user.photo) {
      const currentPhoto = this.getStoragePath(user.photo);

      if (existsSync(currentPhoto)) {
        unlinkSync(currentPhoto);
      }
    }

    return user;
  }

  async setPhoto(file: Express.Multer.File, id: number) {
    const user = await this.removePhoto(id);

    let ext = '';

    switch (file.mimetype) {
      case 'image/png':
        ext = 'png';
        break;

      default:
        ext = 'jpg';
    }

    const photo = `${file.filename}.${ext}`;

    const from = this.getStoragePath(file.filename);
    const to = this.getStoragePath(photo);

    renameSync(from, to);

    return this.database.user.update({
      data: {
        photo,
      },
      where: {
        id: user.id,
      },
    });
  }

  async getPhoto(id: number, response: Response) {
    const { photo } = await this.getById(id);

    if (photo) {
      const filePath = this.getStoragePath(photo);

      const file = createReadStream(filePath);

      let mimetype = '';
      const extension = filePath.split('.').pop().toLowerCase();

      switch (extension) {
        case 'png':
          mimetype = 'image/png';
          break;

        case 'jpg':
        case 'jpeg':
        default:
          mimetype = 'image/jpeg';
          break;
      }

      response.set({
        'Content-Type': mimetype,
      });

      return new StreamableFile(file);
    }
  }
}
