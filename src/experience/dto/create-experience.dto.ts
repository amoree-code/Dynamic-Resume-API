import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Senior Backend Developer' })
  @IsString()
  role: string;

  @ApiPropertyOptional({ example: 'Built microservices with NestJS' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiPropertyOptional({ example: 'Baghdad, Iraq' })
  @IsOptional()
  @IsString()
  location?: string;
}
