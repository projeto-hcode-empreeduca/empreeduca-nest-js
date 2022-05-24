import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { nameColumn } from '../utils/nameColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class MoviesCategoriesTable1653416238742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'moviesCategories',
        columns: [idColumn, nameColumn(), createdAtColumn, updatedAtColumn],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('moviesCategories');
  }
}
