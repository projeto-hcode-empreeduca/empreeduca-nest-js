import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { charColumn } from '../utils/charColumn';
import { createdAtColumn } from '../utils/createdAtColumn';
import { idColumn } from '../utils/idColumn';
import { nameColumn } from '../utils/nameColumn';
import { updatedAtColumn } from '../utils/updatedAtColumn';

export class StatesTable1653415660087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'states',
        columns: [
          idColumn,
          nameColumn('31'),
          charColumn('uf', '2'),
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (1, 'Acre', 'AC');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (2, 'Alagoas', 'AL');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (3, 'Amapá', 'AP');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (4, 'Amazonas', 'AM');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (5, 'Bahia', 'BA');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (6, 'Ceará', 'CE');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (7, 'Distrito Federal', 'DF');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (8, 'Espírito Santo', 'ES');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (9, 'Goiás', 'GO');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (10, 'Maranhão', 'MA');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (11, 'Mato Grosso', 'MT');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (12, 'Mato Grosso do Sul', 'MS');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (13, 'Minas Gerais', 'MG');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (14, 'Pará', 'PA');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (15, 'Paraíba', 'PB');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (16, 'Paraná', 'PR');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (17, 'Pernambuco', 'PE');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (18, 'Piauí', 'PI');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (19, 'Rio de Janeiro', 'RJ');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (20, 'Rio Grande do Norte', 'RN');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (21, 'Rio Grande do Sul', 'RS');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (22, 'Rondônia', 'RO');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (23, 'Roraima', 'RR');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (24, 'Santa Catarina', 'SC');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (25, 'São Paulo', 'SP');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (26, 'Sergipe', 'SE');`,
    );
    await queryRunner.query(
      `INSERT INTO states (id, name, uf) VALUES (27, 'Tocantins', 'TO');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('states');
  }
}
