import React, { useState } from 'react'

function ProductForUser ({ data }) {
  const [quantities, setQuantities] = useState({})

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({ ...prev, [productId]: value }))
  }

  return (
    <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
      {data.map(product => (
        <div
          key={product._id || product.name}
          className='min-w-[260px] max-w-[260px] flex-shrink-0 p-2 mb-4 rounded-[20px] bg-white shadow'
        >
          <img
            src={product.image}
            alt=''
            className='w-full h-32 object-cover rounded-[16px]'
          />
          <div className='flex justify-between items-center mt-4'>
            <p
              style={{
                background: 'linear-gradient(90deg, #C0EE7D 0%, white 100%)'
              }}
              className='px-2 py-0.5 text-sm font-semibold'
            >
              {product.offer}% OFF
            </p>
            <p
              className={`flex items-center ${
                product.status === 'sold out'
                  ? 'bg-[#767676] text-white'
                  : 'bg-[#FFE9B2] text-[#6B4E03]'
              } text-sm rounded-full font-semibold px-3 py-0.5`}
            >
              {product.status}
            </p>
          </div>

          <h2 className='text-2xl mt-4'>{product.name}</h2>
          <h3 className='text-[#767676] mt-2'>From {product.location}</h3>
          <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center'>
              <select
                className='rounded px-2 py-1 mr-1'
                value={quantities[product._id || product.name] || 5}
                onChange={e =>
                  handleQuantityChange(
                    product._id || product.name,
                    Number(e.target.value)
                  )
                }
              >
                {Array.from({ length: 11 }, (_, i) => i + 5).map(val => (
                  <option key={val} value={val}>
                    {`${val} Kgs`}
                  </option>
                ))}
              </select>
            </div>
            <p>₹{product.price}</p>
          </div>
          <button className='border rounded-lg text-center w-full mt-2 py-2 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer'>
            ADD
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductForUser