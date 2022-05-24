import { TableColumnOptions } from 'typeorm';
import { varcharColumn } from './varcharColumn';

export const nameColumn = (length = '127'): TableColumnOptions =>
  varcharColumn('name', length);
