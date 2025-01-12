import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ConfirmDeletionDto {
  @ApiProperty({ description: 'Current password to confirm deletion' })
  @IsString()
  @MinLength(1)
  password: string;
}
