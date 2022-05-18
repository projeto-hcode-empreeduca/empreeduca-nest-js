import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CoinsModule } from './coins/coins.module';

@Module({
  imports: [CategoriesModule, CoinsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
