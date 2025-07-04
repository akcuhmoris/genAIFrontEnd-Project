import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, ProjectModule, AuthModule]
})
export class AppModule {}
