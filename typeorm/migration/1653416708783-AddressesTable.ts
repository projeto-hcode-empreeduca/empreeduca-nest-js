import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { charColumn } from '../utils/charColumn';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { intColumn } from '../utils/intColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';
import { varcharColumn } from '../utils/varcharColumn';

export class AddressesTable1653416708783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          idColumn,
          varcharColumn('street', '255'),
          varcharColumn('number', '7'),
          varcharColumn('complement'),
          varcharColumn('district'),
          charColumn('zipCode', '8'),
          intColumn('cityId'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        columnNames: ['cityId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
        name: 'fk_addresses_cities',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('addresses', 'fk_addresses_cities');
    await queryRunner.dropTable('addresses');
  }
}
