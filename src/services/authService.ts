import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signUserIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { success: true, user: userCredential.user };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: false, errorCode, errorMessage };
    });
};

export const signUserOut = async () => {
  return await auth
    .signOut()
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, error };
    });
};
