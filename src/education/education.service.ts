import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.education.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findOne(id: number) {
    const edu = await this.prisma.education.findUnique({ where: { id } });
    if (!edu) throw new NotFoundException('Education not found');
    return edu;
  }

  create(userId: number, dto: CreateEducationDto) {
    return this.prisma.education.create({ data: { ...dto, userId } });
  }

  async update(id: number, dto: UpdateEducationDto) {
    await this.findOne(id);
    return this.prisma.education.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.education.delete({ where: { id } });
  }
}
