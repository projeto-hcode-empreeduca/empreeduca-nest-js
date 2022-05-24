import { TableColumnOptions } from 'typeorm';

export const updatedAtColumn: TableColumnOptions = {
  name: 'updatedAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
};
