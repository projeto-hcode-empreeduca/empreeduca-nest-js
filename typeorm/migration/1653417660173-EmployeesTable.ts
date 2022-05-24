import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { charColumn } from '../utils/charColumn';
import { createdAtColumn } from '../utils/createdAtColumn';
import { dateColumn } from '../utils/dateColumn';
import { decimalColumn } from '../utils/decimalColumn';
import { idColumn } from '../utils/idColumn';
import { intColumn } from '../utils/intColumn';
import { personIdFkColumn } from '../utils/personIdFkColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class EmployeesTable1653417660173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          idColumn,
          intColumn('personId'),
          decimalColumn('salary'),
          intColumn('totalSales'),
          intColumn('coinId'),
          intColumn('ruleId'),
          dateColumn('startAt'),
          dateColumn('endAt'),
          charColumn('cpf', '11'),
          charColumn('phone', '13'),
          dateColumn('birthAt'),
          {
            name: 'yearsOld',
            type: 'tinyint',
          },
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'employees',
      personIdFkColumn('employees'),
    );

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        columnNames: ['coinId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coins',
        onDelete: 'CASCADE',
        name: 'fk_employees_coins',
      }),
    );

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        columnNames: ['ruleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rules',
        onDelete: 'CASCADE',
        name: 'fk_employees_rules',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
