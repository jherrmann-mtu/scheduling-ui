import { createContext, useState } from 'react';

interface AuthContextType {
  token: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({token: ""} as AuthContextType);

export function AuthProvider({ children } : {children : any}) {
  const [token, setAuth] = useState<string>("");

  return (
    <AuthContext value={{ token, setAuth }}>
      {children}
    </AuthContext>
  );
}