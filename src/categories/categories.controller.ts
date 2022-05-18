import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/categories.create.dto';
import { UpdateCategoriesDto } from './dto/categories.update.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() category: CreateCategoriesDto) {
    return this.categoriesService.create(category);
  }

  @Get()
  read() {
    return this.categoriesService.list();
  }

  @Get(':id')
  show(@Param('id') id) {
    return this.categoriesService.get(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() category: UpdateCategoriesDto) {
    return this.categoriesService.update(id, category);
  }

  @Patch(':id')
  patch(@Param('id') id, @Body() category: UpdateCategoriesDto) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.categoriesService.delete(id);
  }
}
