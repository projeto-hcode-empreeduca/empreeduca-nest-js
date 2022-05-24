import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { intColumn } from '../utils/intColumn';

export class UsersPermissionsTable1653418777217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usersPermissions',
        columns: [
          { ...intColumn('userId'), isPrimary: true },
          { ...intColumn('permissionId'), isPrimary: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'usersPermissions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'fk_usersPermissions_users',
      }),
    );
    await queryRunner.createForeignKey(
      'usersPermissions',
      new TableForeignKey({
        columnNames: ['permissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
        name: 'fk_usersPermissions_permissions',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usersPermissions');
  }
}
