import { TableColumnOptions } from 'typeorm';

export const intColumn = (name): TableColumnOptions => ({
  name,
  type: 'int',
});
