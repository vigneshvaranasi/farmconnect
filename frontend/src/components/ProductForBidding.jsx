import React from 'react'

function ProductForBidding ({ data }) {
  return (
    <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
      {data.map(product => (
        <div
          key={product._id || product.name}
          className='min-w-[250px] max-w-[250px] flex-shrink-0 p-2 mb-4 rounded-[12px] bg-white shadow'
        >
          <img
            src={product.image}
            alt=''
            className='w-full h-32 object-cover rounded-[16px]'
          />
          <div className='px-2 mt-2'>
            <p className='text-xl'>{product.name}</p>
            <p className='text-[#767676]'>From {product.location}</p>
            <div className='flex justify-between mt-2'>
              <div className='flex flex-col'>
                <h2 className='font-semibold'>Stock</h2>
                <p className='text-[#767676]'>{product.Stock} ton</p>
              </div>
              <div className='flex flex-col'>
                <h2 className='font-semibold'>Starting Price</h2>
                <p className='text-[#767676]'>₹{product.startingPrice}/Kg</p>
              </div>
            </div>
            <div className='flex justify-between mt-3 font-semibold'>
              <h2>AGMARK Grade</h2>
              <p className='bg-[#ecfae5] px-1'>{product.AGMARKGrade}</p>
            </div>
            <div className='flex justify-between font-semibold'>
              <h2>Stock Location</h2>
              <p>{product.stockLocation}</p>
            </div>
            <p className='font-semibold'>Tags</p>
            {product.tags && product.tags.length > 0 ? (
              <div className='flex flex-wrap gap-1'>
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-medium ${
                      tag == 'Organic'
                        ? 'bg-[#efffe7]'
                        : tag == 'Freshly Harvested'
                        ? 'bg-[#e7f8ff]'
                        : ''
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className='text-[#767676]'>No tags available</p>
            )}
            <h1 className='flex justify-between mt-4 font-semibold'>
              <span>Bid Start Date</span>
              <span>{product.bidStartDate}</span>
            </h1>
            <h1 className='flex justify-between font-semibold'>
              <span>Bid End Date</span>
              <span>{product.bidEndDate}</span>
            </h1>
            <h1 className='flex justify-between font-semibold'>
              <span>Time Left</span>
              <span className='px-2 py-0.5 bg-[#ffeded]'>
                {product.timeLeft}
              </span>
            </h1>
          </div>
          <button className='border-[0.5px] w-full mt-3 rounded-md py-1'>
            View Farmer Details
          </button>
          <button className='border-[0.5px] w-full mt-3 rounded-md py-1 mb-2'>
            View AGMARK Certificate
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductForBidding
