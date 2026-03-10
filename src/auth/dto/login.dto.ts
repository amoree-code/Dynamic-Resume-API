import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'amoree.allami@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test.123' })
  @IsString()
  password: string;
}
