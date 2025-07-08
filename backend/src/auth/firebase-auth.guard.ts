// src/auth/firebase-auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from "@nestjs/common";
  import { firebaseAdmin } from "../firebase-admin";
  
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader?.startsWith("Bearer ")) {
        throw new UnauthorizedException("No token");
      }
  
      const token = authHeader.split("Bearer ")[1];
  
      try {
        const decoded = await firebaseAdmin.auth().verifyIdToken(token);
        request.user = decoded;
        return true;
      } catch (err) {
        console.error("Firebase token verification failed", err);
        throw new UnauthorizedException("Invalid token");
      }
    }
  }
  