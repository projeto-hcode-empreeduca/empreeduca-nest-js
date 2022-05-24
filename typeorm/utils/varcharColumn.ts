import { TableColumnOptions } from 'typeorm';

export const varcharColumn = (
  name = 'name',
  length = '127',
): TableColumnOptions => ({
  name,
  type: 'varchar',
  length,
});
