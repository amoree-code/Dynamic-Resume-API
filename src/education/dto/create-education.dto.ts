import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'University of Baghdad' })
  @IsString()
  institution: string;

  @ApiProperty({ example: "Bachelor's" })
  @IsString()
  degree: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  field: string;

  @ApiProperty({ example: '2018-09-01' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2022-06-01' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiPropertyOptional({ example: '3.8' })
  @IsOptional()
  @IsString()
  gpa?: string;
}
