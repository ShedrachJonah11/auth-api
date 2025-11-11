import { IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiProperty({ required: false, example: 'en' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false, example: 'UTC' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @ApiProperty({ required: false, example: 'light' })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  customSettings?: Record<string, any>;
}

