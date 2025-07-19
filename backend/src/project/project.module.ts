import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { S3Module } from 'src/cloud/s3.module';

@Module({
  imports: [S3Module],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
