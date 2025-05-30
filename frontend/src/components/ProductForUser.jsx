import React from 'react'

function ProductForUser ({ data }) {
  return (
    <div className='flex gap-3'>
      {data.map(product => (
        <div key={product._id} className='p-2 mb-4 rounded-[20px] bg-white'>
          <img src={product.image} alt='' />
          <div>
            <div>
              <p
                style={{
                  background: 'linear-gradient(90deg, #C0EE7D 0%, white 100%)'
                }}
              >
                {product.offer}% OFF
              </p>
            </div>
          </div>

          <h2 className='text-2xl mt-2'>{product.name}</h2>
          <h3 className='text-[#767676]'>From {product.location}</h3>
        </div>
      ))}
    </div>
  )
}

export default ProductForUser
