import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'amoree.allami@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'OK@amoree1' })
  @IsString()
  password: string;
}
