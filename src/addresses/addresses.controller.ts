import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {

    constructor(private addressesService: AddressesService) {}

    @Get()
    async listAll() {
        return this.addressesService.list();
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return this.addressesService.getById(id);
    }

    @Post()
    async create(@Body() body: CreateAddressDto) {        
        return this.addressesService.create(body);
    }

    async update() {

    }

    async delete() {

    }

}
