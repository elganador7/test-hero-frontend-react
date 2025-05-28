import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { auth } from "../firebase/firebase";
import { api } from "./api";

export const useAuth = () => {
  const signIn = useSignIn();

  const login = async (username: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      // Store the token and update Auth state
      return signIn({
        auth: {
          token: idToken,
          type: "Bearer",
        },
        refresh: idToken,
        userState: { userId: userCredential.user.uid },
      });
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/register", { username, password });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const googleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Store the token and update Auth state
      return signIn({
        auth: {
          token: idToken,
          type: "Bearer",
        },
        refresh: idToken,
        userState: { userId: result.user.uid },
      });
    } catch (error) {
      console.error("Google authentication failed:", error);
      return false;
    }
  };

  return { login, register, googleAuth };
};
