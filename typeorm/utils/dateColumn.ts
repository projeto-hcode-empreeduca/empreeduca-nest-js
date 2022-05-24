import { TableColumnOptions } from 'typeorm';

export const dateColumn = (name): TableColumnOptions => ({
  name,
  type: 'date',
});
