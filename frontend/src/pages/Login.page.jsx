import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import InputBox from '../components/InputBox'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login, error, clearError } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) clearError()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login({ ...formData, userType: 'customer' })
      toast.success(`Welcome back, ${response.data.user.name}!`)
      navigate('/profile')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-[#ececec] mt-[0px] pt-[0px]'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-md w-full rounded-lg p-6 md:p-8'
      >
        <div className='text-center mb-6 md:mb-8'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='font-league-spartan font-semibold text-4xl md:text-5xl text-gray-900 overflow-hidden pt-[0px]'
          >
            <div className='inline-block whitespace-nowrap'>Welcome Back</div>
          </motion.h1>
          <p className='font-league-spartan text-black-900 text-lg mt-3'>
            Sign in to your FarmConnect account
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Input fields remain the same */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <InputBox
              label='Phone Number'
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Enter your phone number'
              pattern='[6-9][0-9]{9}'
              title='Please enter a valid Indian phone number'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InputBox
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-600 text-sm text-center bg-red-50 p-3 rounded'
            >
              {error}
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            type='submit'
            disabled={isLoading}
            className={`w-full text-white py-3 px-4 font-medium rounded transition-all ${
              isLoading
                ? 'bg-[#0f2d1f] cursor-not-allowed'
                : 'bg-[#133524] hover:bg-[#0f2d1f]'
            }`}
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <div className='text-center mt-6 md:mt-8'>
          <p className='text-gray-600 text-sm md:text-base mb-4'>
            Don't have an account?
          </p>
          <Link
            to='/register/customer'
            className='w-full block text-[#133524] border border-black py-3 px-4 font-medium rounded   text-center'
          >
            Register as Customer
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
