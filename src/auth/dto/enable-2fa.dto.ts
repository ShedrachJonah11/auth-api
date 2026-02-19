import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Enable2FADto {
  @ApiProperty({ description: 'TOTP token from authenticator app' })
  @IsString()
  @IsNotEmpty()
  token: string;
}



