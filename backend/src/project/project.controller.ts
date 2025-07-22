import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { S3Service } from "src/cloud/s3.service";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    private readonly s3Service: S3Service
  ) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  createProject(@Body() body: CreateProjectDto, @Req() req) {
    return this.projectService.createProject(body, req.user.uid);
  }
  @Post("upload-prompt")
  @UseGuards(FirebaseAuthGuard)
  async uploadPrompt(@Body("prompt") prompt: string, @Req() req) {
    if (!prompt) return { error: "Prompt is required" };

    await this.s3Service.uploadPrompt(prompt); // 👈 upload logic
    return { message: "Prompt uploaded to S3 successfully" };
  }


}
