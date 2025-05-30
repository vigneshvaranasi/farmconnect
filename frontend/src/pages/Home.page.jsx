import { motion } from 'framer-motion'
import homeHeroImage from '../assets/hero.jpeg'
import HomeStats from '../components/HomeStats'
import HowItWorks from '../components/HowItWorks'
import Faq from '../components/Faq'

import productImage from '../assets/productImage.png'
import ProductForUser from '../components/ProductForUser'
import ProductForBidding from '../components/ProductForBidding'

function HomePage () {
  const productsForUser = [
    {
      name: 'Onion (Ulligadda)',
      location: 'Vijayawada, Andhra Pradesh',
      price: 20,
      status: '200 orders Served',
      offer: '10',
      image: productImage
    },
    {
      name: 'Tomato',
      location: 'Chennai, Tamil Nadu',
      price: 30,
      status: '150 orders Served',
      offer: '5',
      image: productImage
    },
    {
      name: 'Potato',
      location: 'Mumbai, Maharashtra',
      price: 25,
      status: '300 orders Served',
      offer: '15',
      image: productImage
    },
    {
      name: 'Carrot',
      location: 'Delhi',
      price: 40,
      status: '100 orders Served',
      offer: '8',
      image: productImage
    },
    {
      name: 'Cabbage',
      location: 'Kolkata, West Bengal',
      price: 15,
      status: 'sold out',
      offer: '12',
      image: productImage
    },
    {
      name: 'Cauliflower',
      location: 'Bangalore, Karnataka',
      price: 35,
      status: '200 orders Served',
      offer: '10',
      image: productImage
    }
  ]

  const productsForBidding = [
    {
      name: 'Onion (Ulligadda)',
      location: 'Vijayawada',
      Stock: 100,
      startingPrice: 20,
      AGMARKGrade: 'A',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'Guntur',
      image: productImage,
      bidStartDate: '18th June',
      bidEndDate: '20th June',
      timeLeft: '2 days 5 hours'
    },
    {
      name: 'Tomato',
      location: 'Chennai',
      Stock: 150,
      startingPrice: 30,
      AGMARKGrade: 'B',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'Tiruvallur',
      image: productImage,
      bidStartDate: '19th June',
      bidEndDate: '21st June',
      timeLeft: '3 days 2 hours'
    },
    {
      name: 'Potato',
      location: 'Mumbai',
      Stock: 200,
      startingPrice: 25,
      AGMARKGrade: 'A',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'Nasik',
      image: productImage,
      bidStartDate: '20th June',
      bidEndDate: '22nd June',
      timeLeft: '4 days 1 hour'
    },
    {
      name: 'Carrot',
      location: 'Delhi',
      Stock: 80,
      startingPrice: 40,
      AGMARKGrade: 'B',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'Haryana',
      image: productImage,
      bidStartDate: '21st June',
      bidEndDate: '23rd June',
      timeLeft: '5 days 3 hours'
    },
    {
      name: 'Cabbage',
      location: 'Kolkata',
      Stock: 120,
      startingPrice: 15,
      AGMARKGrade: 'A',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'West Bengal',
      image: productImage,
      bidStartDate: '22nd June',
      bidEndDate: '24th June',
      timeLeft: '6 days 4 hours'
    },
    {
      name: 'Cauliflower',
      location: 'Bangalore',
      Stock: 90,
      startingPrice: 35,
      AGMARKGrade: 'B',
      tags: ['Organic', 'Freshly Harvested'],
      stockLocation: 'Karnataka',
      image: productImage,
      bidStartDate: '23rd June',
      bidEndDate: '25th June',
      timeLeft: '7 days 2 hours'
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
      <div className='league-spartan px-7 py-20'>
        <h1 className='text-4xl mb-3'>Products</h1>
        <ProductForUser data={productsForUser} />
      </div>
      <div className='league-spartan px-7 py-20'>
        <h1 className='text-4xl mb-3'>Bid Products</h1>
        <ProductForBidding data={productsForBidding} />
      </div>
    </div>
  )
}

export default HomePage
