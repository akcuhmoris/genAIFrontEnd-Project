import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  createProject(@Body() body: CreateProjectDto, @Req() req) {
    return this.projectService.createProject(body, req.user.uid);
  }



}
