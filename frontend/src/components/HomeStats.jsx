import React from 'react';

function HomeStats() {
  return (
    <div className='bg-white-100 py-20'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6'>
        {/* Verified Farmers */}
        <div className='md:flex md:flex-col'>
          <h2 className='font-inter font-medium text-[110px] leading-[1] tracking-[0] text-left pl-0'>200</h2>
          <div className='md:pl-4 border-l-2 border-gray-300 ml-3'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2 text-left'>Verified Farmers</h3>
            <p className='text-lg text-gray-600 text-left max-w-[400px]'>
              Sell your crops directly to buyers. No middlemen, better prices.
            </p>
          </div>
        </div>

        {/* Active Wholesalers */}
        <div className='md:flex md:flex-col'>
          <h2 className='font-inter font-medium text-[110px] leading-[1] tracking-[0] text-left '>120</h2>
          <div className='md:pl-4 border-l-2 border-gray-300 ml-[25.75px]'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2 text-left'>Active Wholesalers</h3>
            <p className='text-lg text-gray-600 text-left max-w-[400px]'>
              Bid on fresh produce directly from trusted farmers.
            </p>
          </div>
        </div>

        {/* Happy Customers */}
        <div className='md:flex md:flex-col'>
          <h2 className='font-inter font-medium text-[110px] leading-[1] tracking-[0] text-left'>1500</h2>
          <div className='md:pl-4 border-l-2 border-gray-300 ml-[27.75px]'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2 text-left'>Happy Customers</h3>
            <p className='text-lg text-gray-600 text-left max-w-[400px]'>
              Buy fresh, local produce straight from the source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;