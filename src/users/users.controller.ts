import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get public profile' })
  @Get('me')
  getMe() {
    return this.usersService.getMe();
  }

  @ApiOperation({ summary: 'Update my profile' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req.user as { id: number };
    return this.usersService.updateMe(user.id, dto);
  }
}
