import React from 'react';

function HowItWorks() {
  return (
    <div className='league-spartan my-4 px-4 lg:px-8'>
      <h1 className='text-4xl font-medium mb-6'>How it Works</h1>
      <div className="w-full overflow-x-auto flex justify-between items-center">
        <table className='w-full max-w-8xl text-xl'>
          <thead>
            <tr className='border-b border-black'>
              <th className='text-left px-4 py-4'>Step</th>
              <th className='text-left px-4 py-4'>Farmer</th>
              <th className='text-left px-4 py-4'>Wholesaler</th>
              <th className='text-left px-4 py-4'>User</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-black'>
              <td className='text-left px-4 py-4'>1</td>
              <td className='text-left px-4 py-4'>List Crops</td>
              <td className='text-left px-4 py-4'>Browse Bids</td>
              <td className='text-left px-4 py-4'>Explore Produce</td>
            </tr>
            <tr className='border-b border-black'>
              <td className='text-left px-4 py-4'>2</td>
              <td className='text-left px-4 py-4'>Get Bids</td>
              <td className='text-left px-4 py-4'>Place Bids</td>
              <td className='text-left px-4 py-4'>Place Orders</td>
            </tr>
            <tr className=''>
              <td className='text-left px-4 py-4'>3</td>
              <td className='text-left px-4 py-4'>Earn Fairly</td>
              <td className='text-left px-4 py-4'>Win Bids & Buy</td>
              <td className='text-left px-4 py-4'>Get Fresh Produce</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HowItWorks;
