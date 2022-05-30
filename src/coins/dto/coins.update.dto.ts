import { PartialType } from '@nestjs/swagger';
import { CoinsCreateDto } from './coins.create.dto';

export class CoinsUpdateDto extends PartialType(CoinsCreateDto) {}
