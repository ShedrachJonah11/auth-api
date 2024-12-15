import { PartialType } from '@nestjs/swagger';
import { CreateFeature33Dto } from './create-feature33.dto';

export class UpdateFeature33Dto extends PartialType(CreateFeature33Dto) {}