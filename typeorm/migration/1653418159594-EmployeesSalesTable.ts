import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { intColumn } from '../utils/intColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class EmployeesSalesTable1653418159594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employeesSales',
        columns: [
          { ...intColumn('employeeId'), isPrimary: true },
          { ...intColumn('saleId'), isPrimary: true, isUnique: true },
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'employeesSales',
      new TableForeignKey({
        columnNames: ['employeeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'CASCADE',
        name: 'fk_employeesSales_employees',
      }),
    );

    await queryRunner.createForeignKey(
      'employeesSales',
      new TableForeignKey({
        columnNames: ['saleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sales',
        onDelete: 'CASCADE',
        name: 'fk_employeesSales_sales',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employeesSales');
  }
}
