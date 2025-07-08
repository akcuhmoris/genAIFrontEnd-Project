import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJTi5RrkfJSus_rg4E4QUw_6UfNrghOm8",
  authDomain: "genaifrontend.firebaseapp.com",
  projectId: "genaifrontend",
  storageBucket: "genaifrontend.firebasestorage.app",
  messagingSenderId: "737633926454",
  appId: "1:737633926454:web:ad8e08b2500fd396bec797",
  measurementId: "G-PGFJM29B03"
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const app = initializeApp(firebaseConfig);
  
  app.enableCors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
