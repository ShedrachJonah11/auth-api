import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ example: 'verification-token-here', description: 'Email verification token' })
  @IsString()
  token: string;
}
