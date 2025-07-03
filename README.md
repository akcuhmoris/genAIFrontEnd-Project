# genAIFrontEnd-Project

FrontEnd Generator Project


# AI Frontend Generation Platform

## Setup Instructions

1. Clone the repository
2. Install Docker and Docker Compose
3. From /infra:
   docker-compose up -d
4. Create .env files in /backend and /frontend by copying .env.example
5. Start the backend and frontend projects (instructions in their folders)


## Backend Setup Instructions
Note: cd backend
Note: If Prisma used before run: npx prisma migrate reset 
Note: type y
1. Install Dependecies: npm install
2. cp .env.example .env
3. Make sure .env file has: postgresql://postgres:postgres@localhost:5432/postgres
4. docker-compose up -d 
   port should be: 5432
5. npx prisma migrate dev
   Make sure you get: "Generated Prisma Client"
6. npx prisma studio
   should open in browser and see: User and Project
7. npm run start:dev
   Crtl+c to exit
8. Should see users: [] if not move to step 9 and redo: npm run start:dev
9. For testing Prisma Connectivity:
   Skip if already these: add this this to src/main.ts
      const prisma = new PrismaClient();
      const users = await prisma.user.findMany();
      console.log(users);
