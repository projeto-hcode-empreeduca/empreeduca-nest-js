import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { intColumn } from '../utils/intColumn';
import { nameColumn } from '../utils/nameColumn';
import { stateIdFkColumn } from '../utils/stateIdFkColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class CitiesTable1653416708782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          idColumn,
          nameColumn('31'),
          intColumn('stateId'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey('cities', stateIdFkColumn('cities'));

    await queryRunner.query(
      `INSERT INTO cities (id, name, stateId) VALUES (1, 'São Paulo', 25);`,
    );
    await queryRunner.query(
      `INSERT INTO cities (id, name, stateId) VALUES (2, 'Rio de Janeiro', 19);`,
    );
    await queryRunner.query(
      `INSERT INTO cities (id, name, stateId) VALUES (3, 'Fortaleza', 6);`,
    );
    await queryRunner.query(
      `INSERT INTO cities (id, name, stateId) VALUES (4, 'Manaus', 4);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cities', 'fk_cities_states');
    await queryRunner.dropTable('cities');
  }
}
