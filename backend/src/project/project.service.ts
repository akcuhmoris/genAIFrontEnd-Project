import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async getAllProjects() {
    return this.prisma.project.findMany();
  }

  async createProject(data: CreateProjectDto, userId: number) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        codeUrl: data.codeUrl,
        userId: userId,
      },
    });
  }
  async getProjectById(id: number, userId: number) {
    return this.prisma.project.findFirstOrThrow({
      where: {
        id,
        userId,
      },
    });
  }
  async deleteProject(id: number, userId: number) {
    return this.prisma.project.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }


  async getProjectsForUser(userId: number) {
    return this.prisma.project.findMany({
      where: { userId },
    });
  }
  async updateProject(id: number, userId: number, data: Partial<CreateProjectDto>) {
    return this.prisma.project.updateMany({
      where: { id, userId },
      data,
    });
  }

}
