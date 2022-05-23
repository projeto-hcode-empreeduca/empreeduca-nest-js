import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/database/database.module";
import { CoinsController } from "./coins.controller";
import { CoinsService } from "./coins.service";

@Module({
    imports: [DataBaseModule],
    controllers: [CoinsController],
    providers: [CoinsService],
    exports: [CoinsService],
})
export class CoinsModule {}