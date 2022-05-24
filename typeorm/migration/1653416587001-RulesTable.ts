import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { nameColumn } from '../utils/nameColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class RulesTable1653416587001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rules',
        columns: [idColumn, nameColumn(), createdAtColumn, updatedAtColumn],
      }),
    );

    await queryRunner.query(`INSERT INTO rules (id, name) VALUES (1, 'CIO');`);
    await queryRunner.query(`INSERT INTO rules (id, name) VALUES (2, 'COO');`);
    await queryRunner.query(`INSERT INTO rules (id, name) VALUES (3, 'CFO');`);
    await queryRunner.query(`INSERT INTO rules (id, name) VALUES (4, 'CTO');`);
    await queryRunner.query(`INSERT INTO rules (id, name) VALUES (5, 'CMO');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rules');
  }
}
