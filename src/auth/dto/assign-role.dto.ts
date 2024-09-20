import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({
    description: 'User role to assign',
    example: 'admin',
    enum: ['user', 'admin', 'moderator'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'admin', 'moderator'])
  role: string;
}
