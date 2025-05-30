import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { farmerAPI } from '../services/api';
import toast from 'react-hot-toast';

const FarmerStatusPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setStatusData(null);

    try {
      const response = await farmerAPI.checkStatus(phoneNumber);
      setStatusData(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to check status';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'approved':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Check Request Status
          </motion.h1>
          <p className="text-gray-600">Enter your phone number to check your farmer request status</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              pattern="[6-9][0-9]{9}"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Checking...' : 'Check Status'}
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {statusData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(statusData.status)}`}>
                  {getStatusIcon(statusData.status)}
                  <span className="ml-2 capitalize">{statusData.status}</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-medium">{statusData.phoneNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Request ID:</span>
                <span className="font-mono text-sm">{statusData.requestId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Submitted:</span>
                <span className="text-sm">{new Date(statusData.createdAt).toLocaleDateString()}</span>
              </div>

              {statusData.approvedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved:</span>
                  <span className="text-sm text-green-600">{new Date(statusData.approvedAt).toLocaleDateString()}</span>
                </div>
              )}

              {statusData.rejectedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rejected:</span>
                  <span className="text-sm text-red-600">{new Date(statusData.rejectedAt).toLocaleDateString()}</span>
                </div>
              )}

              {statusData.rejectionReason && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</h4>
                  <p className="text-sm text-red-700">{statusData.rejectionReason}</p>
                </div>
              )}

              {statusData.status === 'approved' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-1">Congratulations!</h4>
                  <p className="text-sm text-green-700">
                    Your farmer account has been approved. You can now login using your phone number and the password provided via email.
                  </p>
                </div>
              )}

              {statusData.status === 'pending' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Under Review</h4>
                  <p className="text-sm text-yellow-700">
                    Your request is currently being reviewed by our team. You'll receive an email notification once a decision is made.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2">
              {statusData.status === 'approved' && (
                <Link
                  to="/login"
                  className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-all text-center"
                >
                  Login Now
                </Link>
              )}
              {statusData.status === 'rejected' && (
                <Link
                  to="/farmer/request"
                  className="block w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-all text-center"
                >
                  Submit New Request
                </Link>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FarmerStatusPage;
