import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { decimalColumn } from '../utils/decimalColumn';
import { idColumn } from '../utils/idColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';
import { varcharColumn } from '../utils/varcharColumn';

export class SalesTable1653416626438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          idColumn,
          varcharColumn('description', '256'),
          decimalColumn('amount'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
