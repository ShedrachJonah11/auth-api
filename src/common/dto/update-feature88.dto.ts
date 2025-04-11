import { PartialType } from '@nestjs/swagger';
import { CreateFeature88Dto } from './create-feature88.dto';

export class UpdateFeature88Dto extends PartialType(CreateFeature88Dto) {}