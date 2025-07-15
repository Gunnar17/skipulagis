import { createContext, useContext, useState, useEffect } from 'react';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0';

type Role = 'public' | 'consultant' | 'admin';
interface UserContextValue { user: any; role: Role; }
const UserContext = createContext<UserContextValue>({ user: null, role: 'public' });

export const UserProvider: React.FC = ({ children }) => {
  const { user } = useAuth0User();
  const [role, setRole] = useState<Role>('public');

  useEffect(() => {
    if (user) {
      // TODO: sækja hlutverk úr gagnagrunni eða JWT
      setRole(user['https://yourapp.com/roles']?.[0] || 'public');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);