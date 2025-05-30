import { motion } from 'framer-motion'
import homeHeroImage from '../assets/hero.jpeg'
import HomeStats from '../components/HomeStats'
import HowItWorks from '../components/HowItWorks'
import Faq from '../components/Faq'

import productImage from '../assets/productImage.png'
import ProductForUser from '../components/ProductForUser'

function HomePage () {
  const productsForUser = [
    {
      name: 'Onion (Ulligadda)',
      location: 'Vijayawada, Andhra Pradesh',
      price: 20,
      unit: 'kg',
      status: '200 orders Served',
      offer: '10',
      image: productImage
    },
    {
      name: 'Tomato',
      location: 'Chennai, Tamil Nadu',
      price: 30,
      unit: 'kg',
      status: '150 orders Served',
      offer: '5',
      image: productImage
    },
    {
      name: 'Potato',
      location: 'Mumbai, Maharashtra',
      price: 25,
      unit: 'kg',
      status: '300 orders Served',
      offer: '15',
      image: productImage
    },
    {
      name: 'Carrot',
      location: 'Delhi',
      price: 40,
      unit: 'kg',
      status: '100 orders Served',
      offer: '8',
      image: productImage
    },
    {
      name: 'Cabbage',
      location: 'Kolkata, West Bengal',
      price: 15,
      unit: 'kg',
      status: '250 orders Served',
      offer: '12',
      image: productImage
    }
  ]
  return (
    <div className='bg-[#ececec]'>
      <div className='px-6 relative'>
        <motion.img
          src={homeHeroImage}
          alt=''
          className='w-full h-auto rounded-4xl'
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div className='absolute top-1/5 transform translate-x-1 -translate-y-1/2 block '>
          <motion.h1
            className='p-8 font-semibold  text-black'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className='text-7xl league-spartan font-semibold'
            >
              Connecting Farmers
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='text-7xl league-spartan font-semibold'
            >
              Directly to Markets
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className='block ps-1 mt-3 league-spartan font-medium text-xl'
            >
              Buy directly from farmers. Bid, shop, and grow together
            </motion.span>
            <div className='flex items-center'>
              <motion.span className='border-t-2 w-1/2 border-black inline-block mt-6.5 pe-2'></motion.span>
              <motion.button
                className='mt-6 ms-2 px-8 py-3 bg-black text-white font-semibold'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              >
                Explore Products
              </motion.button>
            </div>
          </motion.h1>
        </div>
      </div>
      <HomeStats />
      <HowItWorks />
      <Faq />
      {/* <div className='league-spartan px-7'>
        <h1 className='text-4xl'>Products</h1>
        <ProductForUser data={productsForUser} />
      </div> */}
    </div>
  )
}

export default HomePage
