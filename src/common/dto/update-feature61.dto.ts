import { PartialType } from '@nestjs/swagger';
import { CreateFeature61Dto } from './create-feature61.dto';

export class UpdateFeature61Dto extends PartialType(CreateFeature61Dto) {}