import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CitiesModule } from 'src/cities/cities.module';
import { DataBaseModule } from 'src/database/database.module';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }),
    DataBaseModule,
    CitiesModule,
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
