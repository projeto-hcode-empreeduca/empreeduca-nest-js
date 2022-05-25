import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(id: number, {
    email,
    name,
    branchId,
  }: UpdateUserDto) {

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

  async delete() {}

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
}
