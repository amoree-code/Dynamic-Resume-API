import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ summary: 'List all education entries' })
  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @ApiOperation({ summary: 'Get an education entry by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.educationService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an education entry' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() dto: CreateEducationDto) {
    const user = req.user as { id: number };
    return this.educationService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Update an education entry' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEducationDto) {
    return this.educationService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete an education entry' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.educationService.remove(id);
  }
}
