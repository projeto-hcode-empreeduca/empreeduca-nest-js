import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveAdminColumnFromUsersTable1653422006425
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'admin');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'admin',
        type: 'tinyint',
        default: 0,
      }),
    );
  }
}
