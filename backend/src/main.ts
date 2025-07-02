import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
main();

