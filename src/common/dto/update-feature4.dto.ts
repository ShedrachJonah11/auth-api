import { PartialType } from '@nestjs/swagger';
import { CreateFeature4Dto } from './create-feature4.dto';

export class UpdateFeature4Dto extends PartialType(CreateFeature4Dto) {}