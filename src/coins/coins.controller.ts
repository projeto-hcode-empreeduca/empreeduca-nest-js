import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import { CoinsCreateDto } from "./dto/coins.create.dto";
import { CoinsUpdateDto } from "./dto/coins.update.dto";

// http://localhost:4000/coins
@Controller('coins')
export class CoinsController {

    constructor(private coinsService: CoinsService) {}

    // Listar todas as moedas
    // http://localhost:4000/coins (GET)
    @Get()
    list() {
        return this.coinsService.listCoins();
    }

    // Selecionar uma moeda específica
    // http://localhost:4000/coins/:id
    @Get(':coinId')
    getCoin(@Param('coinId') coinId: number) {
        return this.coinsService.getById(coinId);
    }
    
    // Criar uma moeda
    // http://localhost:4000/coins (POST)
    @Post()
    createCoin(@Body() data: CoinsCreateDto) {
        return this.coinsService.create(data);
    }

    // Atualizar uma moeda
    // http://localhost:4000/coins/:coinId (PATCH)
    @Patch(':coinId')
    updateCoin(
        @Body() body: CoinsUpdateDto,
        @Param('coinId') coinId: number,
    ) {
        return this.coinsService.update(body, coinId);
    }

    // Deletar uma moeda
    // http://localhost:4000/coins/:id (DELETE)
    @Delete(':id')
    deleteCoin(@Param('id') id: number) {
        return this.coinsService.delete(id);
    }

}