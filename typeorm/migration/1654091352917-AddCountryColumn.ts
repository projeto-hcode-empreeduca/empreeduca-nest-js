import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCountryColumn1654091352917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('states', new TableColumn({
            name: 'country',
            type: 'varchar',
            isNullable: false,
            default: "'Brasil'",
            length: '255',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('states', 'country');
    }

}
