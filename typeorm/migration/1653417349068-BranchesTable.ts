import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { intColumn } from '../utils/intColumn';
import { nameColumn } from '../utils/nameColumn';
import { stateIdFkColumn } from '../utils/stateIdFkColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class BranchesTable1653417349068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'branches',
        columns: [
          idColumn,
          nameColumn('45'),
          intColumn('stateId'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey('branches', stateIdFkColumn('branches'));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('branches');
  }
}
