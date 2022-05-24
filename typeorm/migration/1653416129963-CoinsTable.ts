import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { charColumn } from '../utils/charColumn';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { nameColumn } from '../utils/nameColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class CoinsTable1653416129963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coins',
        columns: [
          idColumn,
          nameColumn('63'),
          charColumn('code', '3'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO coins (id, name, code) VALUES (1, 'Bitcoin', 'BTC');`,
    );
    await queryRunner.query(
      `INSERT INTO coins (id, name, code) VALUES (2, 'Ethereum', 'ETH');`,
    );
    await queryRunner.query(
      `INSERT INTO coins (id, name, code) VALUES (3, 'Dólar', 'USD');`,
    );
    await queryRunner.query(
      `INSERT INTO coins (id, name, code) VALUES (4, 'Real', 'BRL');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coins');
  }
}
