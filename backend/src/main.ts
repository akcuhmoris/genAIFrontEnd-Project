import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for your frontend
  app.enableCors({
    origin: [
      "http://localhost:5173", // Vite dev server
      "https://your-deployed-frontend.com", // (optional) your deployed URL
    ],
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
