import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './config/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    SkillsModule,
    ExperienceModule,
    EducationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
