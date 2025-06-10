import { PartialType } from '@nestjs/swagger';
import { CreateFeature89Dto } from './create-feature89.dto';

export class UpdateFeature89Dto extends PartialType(CreateFeature89Dto) {}