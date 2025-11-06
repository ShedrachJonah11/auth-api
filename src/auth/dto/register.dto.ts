import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '../../common/decorators/password-strength.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!', description: 'User password (must be strong)', minLength: 8 })
  @IsString()
  @MinLength(8)
  @IsStrongPassword({ message: 'Password must contain uppercase, lowercase, numbers, and special characters' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user', description: 'User role', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
