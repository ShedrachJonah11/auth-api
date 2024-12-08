import { PartialType } from '@nestjs/swagger';
import { CreateFeature2Dto } from './create-feature2.dto';

export class UpdateFeature2Dto extends PartialType(CreateFeature2Dto) {}