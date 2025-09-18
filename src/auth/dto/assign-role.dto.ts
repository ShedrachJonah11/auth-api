import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({ 
    example: 'admin', 
    description: 'User role',
    enum: ['user', 'admin', 'moderator']
  })
  @IsString()
  @IsIn(['user', 'admin', 'moderator'])
  role: string;
}
