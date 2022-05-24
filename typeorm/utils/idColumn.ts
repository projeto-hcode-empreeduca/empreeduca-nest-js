import { TableColumnOptions } from 'typeorm';

export const idColumn: TableColumnOptions = {
  name: 'id',
  type: 'int',
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment',
};
