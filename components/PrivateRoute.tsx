import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface PrivateRouteProps { children: ReactNode; roles: string[]; }
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user, role } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/api/auth/login');
    else if (!roles.includes(role)) router.push('/');
  }, [user, role]);

  if (!user || !roles.includes(role)) return null;
  return <>{children}</>;
};

export default PrivateRoute;