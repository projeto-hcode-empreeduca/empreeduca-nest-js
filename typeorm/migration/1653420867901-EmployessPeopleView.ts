import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployessPeopleView1653420867901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE VIEW employeespeople AS
        SELECT employees.*, people.name FROM employees JOIN people ON employees.personId = people.id;;        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP VIEW employeespeople;
    `);
  }
}
