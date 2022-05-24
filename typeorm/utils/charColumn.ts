import { TableColumnOptions } from 'typeorm';

export const charColumn = (
  name: string,
  length: string,
): TableColumnOptions => ({
  name,
  type: 'char',
  length,
});
