import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

const useAuth = (): [AuthState, (token: string) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      authenticateUser(storedToken);
    }
  }, []);

  const authenticateUser = (token: string) => {
    try {
      const decodedUser = jwtDecode(token);
      setAuthState({
        isAuthenticated: true,
        user: decodedUser,
        token,
      });
      localStorage.setItem('jwtToken', token);
    } catch (error) {
      logoutUser();
    }
  };

  const logoutUser = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('jwtToken');
  };

  return [authState, authenticateUser, logoutUser];
};

export default useAuth;