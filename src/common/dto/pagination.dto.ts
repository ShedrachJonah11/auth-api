import { IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ 
    required: false, 
    minimum: 1, 
    maximum: 100, 
    default: 10,
    description: 'Number of items per page'
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({ 
    required: false, 
    minimum: 1, 
    default: 1,
    description: 'Page number'
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    required: false, 
    description: 'Search term'
  })
  @IsOptional()
  search?: string;

  @ApiProperty({ 
    required: false, 
    description: 'Sort field'
  })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ 
    required: false, 
    enum: ['asc', 'desc'],
    default: 'desc',
    description: 'Sort order'
  })
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
