import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'TypeScript' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Backend' })
  @IsString()
  category: string;

  @ApiProperty({ example: 90, description: '1–100 proficiency level' })
  @IsInt()
  @Min(1)
  @Max(100)
  level: number;

  @ApiPropertyOptional({ example: 'https://example.com/ts-icon.svg' })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;
}
