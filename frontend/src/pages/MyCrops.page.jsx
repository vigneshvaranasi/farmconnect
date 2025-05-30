import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../services/api';

const MyCropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: 'Vegetables',
    description: '',
    price: '',
    quantityAvailable: '',
    unit: 'kg',
    organic: false
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not a farmer
    if (user && user.userType !== 'farmer') {
      navigate('/dashboard');
      toast.error('Only farmers can access this page');
    }
    
    fetchCrops();
  }, [user, navigate]);
  
  const fetchCrops = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/crops');
      setCrops(response.data.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
      toast.error('Failed to fetch your crops');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCrop({
      ...newCrop,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddCrop = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await api.post('/crops', newCrop);
      toast.success('Crop added successfully!');
      setShowAddForm(false);
      setNewCrop({
        name: '',
        category: 'Vegetables',
        description: '',
        price: '',
        quantityAvailable: '',
        unit: 'kg',
        organic: false
      });
      
      // Refresh crops list
      fetchCrops();
    } catch (error) {
      console.error('Error adding crop:', error);
      toast.error('Failed to add crop');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (cropId) => {
    if (!window.confirm('Are you sure you want to delete this crop?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await api.delete(`/crops/${cropId}`);
      toast.success('Crop deleted successfully');
      fetchCrops();
    } catch (error) {
      console.error('Error deleting crop:', error);
      toast.error('Failed to delete crop');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">My Crops</h1>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add New Crop'}
          </motion.button>
        </div>
        
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-green-800">Add New Crop</h2>
            
            <form onSubmit={handleAddCrop} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCrop.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={newCrop.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newCrop.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={newCrop.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantityAvailable"
                    value={newCrop.quantityAvailable}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    name="unit"
                    value={newCrop.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="ton">ton</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                    <option value="liter">liter</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="organic"
                  name="organic"
                  checked={newCrop.organic}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                  Organic Product
                </label>
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-green-600 text-white px-8 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Crop'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && crops.length === 0 ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : crops.length === 0 ? (
            <div className="col-span-full bg-white p-8 rounded-xl shadow text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No crops found</h3>
              <p className="text-gray-500 mb-4">You haven't added any crops yet.</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Add Your First Crop
              </button>
            </div>
          ) : (
            crops.map((crop) => (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {crop.images && crop.images.length > 0 ? (
                  <img 
                    src={crop.images[0]} 
                    alt={crop.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{crop.name}</h3>
                    {crop.organic && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Organic
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">{crop.category}</p>
                  
                  <p className="mt-2 text-gray-700 line-clamp-2">{crop.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-green-700">₹{crop.price}/{crop.unit}</span>
                    <span className="text-sm text-gray-600">
                      {crop.quantityAvailable} {crop.unit} available
                    </span>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => navigate(`/crops/edit/${crop._id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCropsPage;
