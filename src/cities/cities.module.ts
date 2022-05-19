import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database.module';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

@Module({
  imports: [DataBaseModule],
  controllers: [CitiesController],
  providers: [CitiesService]
})
export class CitiesModule {}
