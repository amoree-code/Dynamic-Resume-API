import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findOne(id: number) {
    const exp = await this.prisma.experience.findUnique({ where: { id } });
    if (!exp) throw new NotFoundException('Experience not found');
    return exp;
  }

  create(userId: number, dto: CreateExperienceDto) {
    return this.prisma.experience.create({ data: { ...dto, userId } });
  }

  async update(id: number, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.experience.delete({ where: { id } });
  }
}
