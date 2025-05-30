import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../services/api';
import InputBox from '../components/InputBox';

const MyCropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    stock: '',
    location: '',
    stockLocation: '',
    tags: [],
    agmarkGrade: '',
    agmarkCertificate: null,
    startPrice: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not a farmer
    if (user && user.userType !== 'farmer') {
      navigate('/profile');
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
    
    if (type === 'checkbox') {
      // Handle tags checkbox
      if (name === 'tags') {
        setNewCrop(prev => {
          const updatedTags = checked 
            ? [...prev.tags, value]
            : prev.tags.filter(tag => tag !== value);
          return { ...prev, tags: updatedTags };
        });
      } else {
        setNewCrop(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      setNewCrop(prev => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setNewCrop(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddCrop = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      for (const key in newCrop) {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(newCrop[key]));
        } else if (newCrop[key] !== null) {
          formData.append(key, newCrop[key]);
        }
      }
      
      await api.post('/crops', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Crop added successfully!');
      setShowAddForm(false);
      setNewCrop({
        name: '',
        stock: '',
        location: '',
        stockLocation: '',
        tags: [],
        agmarkGrade: '',
        agmarkCertificate: null,
        startPrice: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      
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
            <h2 className="text-xl font-semibold mb-6 text-green-800">Add New Crop</h2>
            
            <form onSubmit={handleAddCrop} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* First Column - Product Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2">Product Details</h3>
                  
                  <InputBox
                    label="Product Name"
                    name="name"
                    value={newCrop.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                  
                  <InputBox
                    label="Stock (Quantity)"
                    name="stock"
                    type="number"
                    value={newCrop.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                  />
                  
                  <InputBox
                    label="Location"
                    name="location"
                    value={newCrop.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                  />
                  
                  <InputBox
                    label="Stock Location"
                    name="stockLocation"
                    value={newCrop.stockLocation}
                    onChange={handleInputChange}
                    placeholder="Enter stock location"
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Select Tags
                    </label>
                    <div className="space-y-2">
                      {['organic', 'freshly Harvested', '1 week old', '2 week old'].map(tag => (
                        <div key={tag} className="flex items-center">
                          <input
                            type="checkbox"
                            id={tag}
                            name="tags"
                            value={tag}
                            checked={newCrop.tags.includes(tag)}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={tag} className="ml-2 text-gray-700 capitalize">
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Second Column - Quality Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2">Quality Details</h3>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Agmark Grade
                    </label>
                    <div className="flex space-x-4">
                      {['A', 'B', 'C'].map(grade => (
                        <div key={grade} className="flex items-center">
                          <input
                            type="radio"
                            id={`grade-${grade}`}
                            name="agmarkGrade"
                            value={grade}
                            checked={newCrop.agmarkGrade === grade}
                            onChange={handleInputChange}
                            className="h-4 w-4 border-gray-300"
                            style={{
                              color: grade === 'A' ? '#10B981' : 
                                     grade === 'B' ? '#F59E0B' : '#EF4444'
                            }}
                          />
                          <label 
                            htmlFor={`grade-${grade}`} 
                            className="ml-2 text-gray-700"
                            style={{
                              color: grade === 'A' ? '#10B981' : 
                                     grade === 'B' ? '#F59E0B' : '#EF4444'
                            }}
                          >
                            Grade {grade}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Agmark Certificate
                    </label>
                    <input
                      type="file"
                      name="agmarkCertificate"
                      onChange={handleInputChange}
                      accept="image/*,.pdf"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <InputBox
                    label="Description"
                    name="description"
                    value={newCrop.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    type="textarea"
                    className="md:col-span-2"
                  />
                </div>
                
                {/* Third Column - Bid Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2">Bid Details</h3>
                  
                  <InputBox
                    label="Start Price (₹)"
                    name="startPrice"
                    type="number"
                    value={newCrop.startPrice}
                    onChange={handleInputChange}
                    placeholder="Enter start price"
                  />
                  
                  <InputBox
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={newCrop.startDate}
                    onChange={handleInputChange}
                  />
                  
                  <InputBox
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={newCrop.endDate}
                    onChange={handleInputChange}
                  />
                  
                  <InputBox
                    label="Stock Location"
                    name="stockLocation"
                    value={newCrop.stockLocation}
                    onChange={handleInputChange}
                    placeholder="Enter stock location for bidding"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50"
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
                    {crop.tags?.includes('organic') && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Organic
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">Stock: {crop.stock}</p>
                  
                  <p className="mt-2 text-gray-700 line-clamp-2">{crop.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-green-700">₹{crop.startPrice}</span>
                    <span className="text-sm text-gray-600">
                      {crop.stockLocation}
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