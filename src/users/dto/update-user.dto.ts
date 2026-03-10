import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Ameer' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'allami' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ example: 'Abdulkareem' })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiPropertyOptional({ example: 'Full Stack Developer' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Building scalable web applications' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({
    example: 'Passionate developer with 5+ years of experience...',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: '+9647777665783' })
  @IsOptional()
  @IsString()
  phone1?: string;

  @ApiPropertyOptional({ example: '+9647726819007' })
  @IsOptional()
  @IsString()
  phone2?: string;

  @ApiPropertyOptional({ example: 'https://github.com/ameer' })
  @IsOptional()
  @IsUrl({}, { message: 'github must be a valid URL or empty' })
  github?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/ameer' })
  @IsOptional()
  @IsUrl({}, { message: 'linkedin must be a valid URL or empty' })
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/ameer' })
  @IsOptional()
  @IsUrl({}, { message: 'instagram must be a valid URL or empty' })
  instagram?: string;
}
