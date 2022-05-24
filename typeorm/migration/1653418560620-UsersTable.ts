import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { intColumn } from '../utils/intColumn';
import { personIdFkColumn } from '../utils/personIdFkColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';
import { varcharColumn } from '../utils/varcharColumn';

export class UsersTable1653418560620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          idColumn,
          {
            name: 'admin',
            type: 'tinyint',
            default: 0,
          },
          intColumn('personId'),
          intColumn('branchId'),
          { ...varcharColumn('email', '45'), isUnique: true },
          varcharColumn('password', '45'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey('users', personIdFkColumn('users'));
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['branchId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'branches',
        onDelete: 'CASCADE',
        name: 'fk_users_branches',
      }),
    );

    await queryRunner.query(
      `INSERT INTO people (id, name) VALUES (1, 'João');`,
    );

    await queryRunner.query(
      `INSERT INTO branches (id, name, stateId) VALUES (1, 'São Paulo', 25);`,
    );

    await queryRunner.query(
      `INSERT INTO users (id, personId, branchId, email, password) VALUES (1, 1, 1, 'joao@hcode.com.br', '123456');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
