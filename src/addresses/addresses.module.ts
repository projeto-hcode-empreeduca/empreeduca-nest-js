import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/cities/cities.module';
import { DataBaseModule } from 'src/database/database.module';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [DataBaseModule, CitiesModule],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {}
