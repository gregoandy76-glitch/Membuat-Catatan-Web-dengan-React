import { createContext, useContext, useState, useEffect } from 'react';
import { getUserLogged, putAccessToken } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    getUserLogged().then(({ error, data }) => {
      if (!error) setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  function onLoginSuccess(accessToken) {
    putAccessToken(accessToken);
    getUserLogged().then(({ data }) => setAuthedUser(data));
  }

  function onLogout() {
    putAccessToken('');
    setAuthedUser(null);
  }

  return (
    <AuthContext.Provider value={{ authedUser, initializing, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
