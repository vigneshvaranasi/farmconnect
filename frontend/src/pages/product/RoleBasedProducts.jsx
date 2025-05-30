import { useAuth } from '../../contexts/AuthContext';
import CustomerProduct from './CustomerProduct';
import TraderProduct from './TraderProduct';
import FarmerProduct from './FarmerProduct';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MyCropsPage from '../MyCrops.page';

export default function RoleBasedProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      toast('Please login to access this page', {
        icon: '🔒',
        duration: 3000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Redirecting to login page...</p>
      </div>
    );
  }

  switch (user.userType) {
    case 'customer':
      return <CustomerProduct />;
    case 'trader':
      return <TraderProduct />;
    case 'farmer':
      return <MyCropsPage />;
    default:
      toast.error('You are not authorized to view this page');
      return <Navigate to="/" replace />;
  }
}