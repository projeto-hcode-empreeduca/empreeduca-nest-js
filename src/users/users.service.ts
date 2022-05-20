import { BadRequestException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";

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

    async create({
        name,
        email,
        password,
        branchId,
    }: CreateUserDto) {

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
        });

    }

    async update() {
        
    }

    async delete() {

    }

}
