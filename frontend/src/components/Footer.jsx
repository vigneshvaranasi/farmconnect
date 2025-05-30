import React from 'react'
import farmconnectLogo from '../assets/logo.svg'
import footerLogo from '../assets/footerLogo.svg'
import { motion } from 'framer-motion'

function Footer () {
  return (
    <div className='bg-[#ececec]'>
      <div className='bg-black text-white flex justify-between items-center p-10 league-spartan'>
        <div className='flex gap-15 text-xl font-semibold'>
          <div>
            <p className='mb-6'>About Us</p>
            <p className='mb-6'>Contact</p>
            <p className='mb-6'>FAQs</p>
          </div>
          <div>
            <p className='mb-6'>Terms & Conditions</p>
            <p className='mb-6'>Privacy Policy</p>
            <p className='mb-6'>Social Media Links</p>
          </div>
        </div>
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          src={footerLogo}
          className='w-44'
          alt=''
        />
      </div>
      <div className='flex justify-center items-center p-6 bg-[#ececec]'>
        <img src={farmconnectLogo} className='mx-auto py-4 ps-14' alt='' />
      </div>
    </div>
  )
}

export default Footer
