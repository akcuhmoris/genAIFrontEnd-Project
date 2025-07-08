import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  // Return all projects (no user filtering)
  getAllProjects() {
    return this.prisma.project.findMany();
  }

  // Return one project by ID
  async getProjectById(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  // Create a project
  createProject(data: CreateProjectDto, firebaseUid: string) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        codeUrl: data.codeUrl,
        firebaseUid,
        // userId: optional if you also want relational link
      },
    });
  }
  
  
  
  

  // Delete a project by ID
  deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
