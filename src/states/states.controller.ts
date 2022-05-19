import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {

    private statesService: StatesService;

    constructor(service: StatesService) {
        this.statesService = service;
    }

    @Get()
    async listAll() {
        return this.statesService.listStates();
    }

    @Get(':id')
    async selectState(@Param() params: { id: number }) {
        return this.statesService.getById(params.id);        
    }

    @Post()
    async createState(
        @Body() data: CreateStateDto,
    ) {
        return this.statesService.create(data);
    }

    @Put(':id')
    async updateState(
        @Body() data: UpdateStateDto,
        @Param('id') id: number,
    ) {
        return this.statesService.update(data, id);
    }

    @Delete(':id')
    async deleteState(@Param('id') id: number) {
        return this.statesService.delete(id);
    }

}
