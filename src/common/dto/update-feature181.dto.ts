import { PartialType } from '@nestjs/swagger';
import { CreateFeature181Dto } from './create-feature181.dto';

export class UpdateFeature181Dto extends PartialType(CreateFeature181Dto) {}