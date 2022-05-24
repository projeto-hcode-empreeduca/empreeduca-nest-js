import { TableColumnOptions } from 'typeorm';

export const decimalColumn = (name): TableColumnOptions => ({
  name,
  type: 'decimal',
  precision: 10,
  scale: 2,
});
