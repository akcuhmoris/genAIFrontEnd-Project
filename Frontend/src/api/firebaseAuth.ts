import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

export async function firebaseLogin(email: string, password: string) {
  const auth = getAuth(app);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return token;
}
