// src/firebase-admin.ts
import * as admin from "firebase-admin";
import * as path from "path";

admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, "../serviceAccountKey.json")
  ),
});

export const firebaseAdmin = admin;
