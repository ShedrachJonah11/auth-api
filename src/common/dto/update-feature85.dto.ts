import { PartialType } from '@nestjs/swagger';
import { CreateFeature85Dto } from './create-feature85.dto';

export class UpdateFeature85Dto extends PartialType(CreateFeature85Dto) {}