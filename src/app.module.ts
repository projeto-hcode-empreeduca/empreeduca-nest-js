import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CoinsModule } from './coins/coins.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { AddressesModule } from './addresses/addresses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BranchesModule } from './branches/branches.module';
import { RulesModule } from './rules/rules.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    CategoriesModule,
    CoinsModule,
    StatesModule,
    CitiesModule,
    AddressesModule,
    UsersModule,
    AuthModule,
    BranchesModule,
    RulesModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
