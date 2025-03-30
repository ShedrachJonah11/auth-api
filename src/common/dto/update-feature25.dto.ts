import { PartialType } from '@nestjs/swagger';
import { CreateFeature25Dto } from './create-feature25.dto';

export class UpdateFeature25Dto extends PartialType(CreateFeature25Dto) {}