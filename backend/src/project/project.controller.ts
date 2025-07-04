import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { Req, UseGuards } from '@nestjs/common';
import { Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';



@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProjects(@Req() req: Request) {
    const user = req.user as { userId: number };
    return this.projectService.getProjectsForUser(user.userId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProjectById(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.projectService.getProjectById(id, user.userId);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteProject(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.projectService.deleteProject(id, user.userId);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateProjectDto>,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: number };
    return this.projectService.updateProject(id, user.userId, updateData);
  }





  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.projectService.createProject(createProjectDto, user.userId);
  }

}
