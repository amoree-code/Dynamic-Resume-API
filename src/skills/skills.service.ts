import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.skill.findMany();
  }

  async findOne(id: number) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  create(userId: number, dto: CreateSkillDto) {
    return this.prisma.skill.create({ data: { ...dto, userId } });
  }

  async update(id: number, dto: UpdateSkillDto) {
    await this.findOne(id);
    return this.prisma.skill.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.skill.delete({ where: { id } });
  }
}
