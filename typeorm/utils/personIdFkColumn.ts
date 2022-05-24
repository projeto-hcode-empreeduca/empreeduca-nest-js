import { TableForeignKey } from 'typeorm';

export const personIdFkColumn = (tableName) => {
  return new TableForeignKey({
    columnNames: ['personId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'people',
    onDelete: 'CASCADE',
    name: `fk_${tableName}_people`,
  });
};
