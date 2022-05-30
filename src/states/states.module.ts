import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/database/database.module';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';

@Module({
  imports: [DataBaseModule],
  controllers: [StatesController],
  providers: [StatesService],
  exports: [StatesService],
})
export class StatesModule {}
