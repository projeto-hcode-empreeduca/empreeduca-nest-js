import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async listAllCities() {
    return this.citiesService.list();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.citiesService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateCityDto) {
    return this.citiesService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: UpdateCityDto, @Param('id') id: number) {
    return this.citiesService.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.citiesService.delete(id);
  }
}
