import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CoinsModule } from './coins/coins.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [CategoriesModule, CoinsModule, StatesModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
