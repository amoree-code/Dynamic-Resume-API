import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Portfolio' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A personal portfolio website' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'Full description here...' })
  @IsOptional()
  @IsString()
  longDesc?: string;

  @ApiProperty({ example: ['NestJS', 'React', 'PostgreSQL'] })
  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @ApiPropertyOptional({ example: 'https://myapp.com' })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/me/repo' })
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;


}
