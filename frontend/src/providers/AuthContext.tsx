import { createContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface UserType {
  token: string
  user_email: string;
  user_first_name: string;
  user_gender: string;
  user_id: number;
  user_last_name: string;
  user_location: string | null;
  email_confirmed: number;
  user_mobile: string;
  user_status: string;
  user_type: string;
  mobile_confirmed: number;
}

export interface AuthContextType {
  user: UserType | null;
  setUser: (userData: UserType | null) => void;
  login: (userData: UserType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null && storedUser !== "undefined") {
      console.log("HIT");
      console.log(storedUser);
      return JSON.parse(storedUser);
    }
    return null;
  });

  const login = useCallback((userData: UserType) => {
    console.log("LOGIN CALLED");
    console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/auth');
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;