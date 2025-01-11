import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class SetAvatarDto {
  @ApiProperty({ description: 'Avatar image URL' })
  @IsString()
  @IsUrl()
  avatarUrl: string;
}
