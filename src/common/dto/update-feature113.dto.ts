import { PartialType } from '@nestjs/swagger';
import { CreateFeature113Dto } from './create-feature113.dto';

export class UpdateFeature113Dto extends PartialType(CreateFeature113Dto) {}