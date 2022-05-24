import { TableColumnOptions } from 'typeorm';

export const createdAtColumn: TableColumnOptions = {
  name: 'createdAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
};
