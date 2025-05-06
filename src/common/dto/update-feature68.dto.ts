import { PartialType } from '@nestjs/swagger';
import { CreateFeature68Dto } from './create-feature68.dto';

export class UpdateFeature68Dto extends PartialType(CreateFeature68Dto) {}