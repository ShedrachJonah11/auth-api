import { PartialType } from '@nestjs/swagger';
import { CreateFeature44Dto } from './create-feature44.dto';

export class UpdateFeature44Dto extends PartialType(CreateFeature44Dto) {}