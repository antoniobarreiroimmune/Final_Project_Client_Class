import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const RoleBasedRedirect = () => {
  const { user } = useContext(AuthContext);

  
  if (user) {
    switch (user.role) {
      case 'Guard':
        return <Navigate to="/guardhome" />;
      case 'Pathologist':
        return <Navigate to="/pathologies" />;
      default:
        return <Navigate to="/" />;
    }
  }

  
  return <Navigate to="/login" />;
};

export default RoleBasedRedirect;
