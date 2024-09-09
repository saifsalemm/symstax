import { isAuthenticatedAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { signUserIn, signUserOut } from "../services/authService";
import { useState } from "react";

const useAuth = () => {
  const [_, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [credsIncorrect, setCredsIncorrect] = useState(false);
  const [pending, setPending] = useState(false);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setPending(true);
    const response = await signUserIn({ email, password });
    if (response.success) {
      setIsAuthenticated(true);
      setCredsIncorrect(false);
    } else {
      setIsAuthenticated(false);
      setCredsIncorrect(true);
    }
    setPending(false);
    return response;
  };

  const signOut = async () => {
    setPending(true);
    const response = await signUserOut();
    if (response.success) {
      setIsAuthenticated(false);
    }
    setPending(false);
    return response;
  };

  return {
    signIn,
    signOut,
    pending,
    credsIncorrect,
  };
};
export default useAuth;
