import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export function clearAuth() {
  window.localStorage.setItem("token", "");
  window.location.reload();
}

export const AuthContext = createContext<AuthContextType>({token: ""} as AuthContextType);

export function AuthProvider({ children } : {children : any}) {
  const [token, setAuth] = useState<string>("");
  useEffect(() => {
    if (token === "") {
      const cachedToken = window.localStorage.getItem("token");
      if (cachedToken !== null && cachedToken !== "") {
        setAuth(cachedToken);
      }
    }
  }, [])

  useEffect(() => {
    if (token !== "") {
      window.localStorage.setItem("token", token);
    }
  }, [token])

  return (
    <AuthContext value={{ token, setAuth }}>
      {children}
    </AuthContext>
  );
}