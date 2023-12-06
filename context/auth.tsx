import React from 'react';
import { useStorageState } from './userStorageState';
import { loginBorrower } from '../services/authService';

const AuthContext = React.createContext<{ signIn: (email: string, password: string) => void; signOut: () => void; session?: any | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          try {
            const response = await loginBorrower({
              email,
              password
            })

            const user = response.data.user
            console.log('Login Gagal');
            alert('Login Berhasil')
            setSession(user);
          } catch (error) {
            console.log('Login Gagal');
            const errorMessage = error.response.data.message
            alert(`Login Gagal ${errorMessage}`)
          }

        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
