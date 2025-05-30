import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is empty array, allow all authenticated users
  if (allowedRoles.length === 0 || allowedRoles.includes(user?.userType)) {
    return children;
  }

  // Not authorized
  return <Navigate to="/" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default PrivateRoute;