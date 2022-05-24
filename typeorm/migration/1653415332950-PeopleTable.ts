import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { nameColumn } from '../utils/nameColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class PeopleTable1653415332950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'people',
        columns: [idColumn, nameColumn('45'), createdAtColumn, updatedAtColumn],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('people');
  }
}
