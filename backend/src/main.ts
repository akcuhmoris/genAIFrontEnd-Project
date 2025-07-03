import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  console.log('BOOTSTRAP STARTED');

  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log('USERS:', users);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
