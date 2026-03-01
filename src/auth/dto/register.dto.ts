import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'amoree.allami@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'OK@amoree1', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'ameer' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'allami' })
  @IsOptional()
  @IsString()
  nickname?: string;
}
