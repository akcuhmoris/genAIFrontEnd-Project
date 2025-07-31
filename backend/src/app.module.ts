import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { S3Module } from './cloud/s3.module';
import { WebsiteController } from './website/website.controller';
import { GenerateModule } from './generate/generate.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectModule,
    S3Module,
    GenerateModule, // Import the GenerateModule here
  ],
  controllers: [WebsiteController],
})
export class AppModule {}
