import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async listAll() {
    return this.addressesService.list();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async show(@Param('id') id: number) {
    return this.addressesService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateAddressDto) {
    return this.addressesService.create(body);
  }
}
