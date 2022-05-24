import { TableForeignKey } from 'typeorm';

export const stateIdFkColumn = (tableName) => {
  return new TableForeignKey({
    columnNames: ['stateId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'states',
    onDelete: 'CASCADE',
    name: `fk_${tableName}_states`,
  });
};
