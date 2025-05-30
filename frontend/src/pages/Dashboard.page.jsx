import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      case 'trader':
        return 'bg-purple-100 text-purple-800';
      case 'farmer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'customer':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        );
      case 'trader':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        );
      case 'farmer':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white mr-6"
              >
                {getUserTypeIcon(user?.userType)}
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  Welcome, {user?.name}!
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center"
                >
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(user?.userType)}`}>
                    <span className="capitalize">{user?.userType}</span>
                  </span>
                </motion.div>
              </div>
            </div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* User Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-lg text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-lg text-gray-900">{user?.phoneNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-lg text-gray-900">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
              <p className="text-lg text-gray-900 capitalize">{user?.userType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <p className="text-sm text-gray-600 font-mono">{user?.id}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.userType === 'customer' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-blue-900 mb-2">Browse Products</h3>
                  <p className="text-sm text-blue-700">Explore fresh products from farmers</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-green-900 mb-2">My Orders</h3>
                  <p className="text-sm text-green-700">View your order history</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-purple-900 mb-2">Favorites</h3>
                  <p className="text-sm text-purple-700">Manage your favorite products</p>
                </div>
              </>
            )}

            {user?.userType === 'trader' && (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-purple-900 mb-2">Manage Inventory</h3>
                  <p className="text-sm text-purple-700">Add and manage your products</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-orange-900 mb-2">View Sales</h3>
                  <p className="text-sm text-orange-700">Track your sales performance</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-blue-900 mb-2">Analytics</h3>
                  <p className="text-sm text-blue-700">View business analytics</p>
                </div>
              </>
            )}            {user?.userType === 'farmer' && (
              <>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/my-crops')}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-green-900 mb-2">My Crops</h3>
                  <p className="text-sm text-green-700">Manage your crop listings</p>
                </motion.div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-yellow-900 mb-2">Market Prices</h3>
                  <p className="text-sm text-yellow-700">Check current market rates</p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/my-orders')}
                  className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-indigo-900 mb-2">Orders</h3>
                  <p className="text-sm text-indigo-700">View incoming orders</p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
