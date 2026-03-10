import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe() {
    const user = await this.prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        nickname: true,
        surname: true,
        phone1: true,
        phone2: true,
        title: true,
        subtitle: true,
        bio: true,
        github: true,
        linkedin: true,
        instagram: true,
        projects: true,
        skills: true,
        experiences: true,
        educations: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateMe(userId: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
        nickname: true,
        surname: true,
        phone1: true,
        phone2: true,
        title: true,
        subtitle: true,
        bio: true,
        github: true,
        linkedin: true,
        instagram: true,
        projects: true,
        skills: true,
        experiences: true,
        educations: true,
      },
    });
  }
}
