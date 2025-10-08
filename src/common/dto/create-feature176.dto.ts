import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateFeature176Dto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}