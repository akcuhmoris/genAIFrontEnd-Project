import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { FirebaseApp } from 'firebase/app';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, ProjectModule]
})
export class AppModule {}
