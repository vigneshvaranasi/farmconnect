import React from 'react'
import {useNavigate} from 'react-router-dom'
import MyCropsPage from '../MyCrops.page'

function CustomerProduct() {
    console.log("Customer")
    const navigate = useNavigate();
  return (
    <div>
        {navigate("/product")}
    </div>
  )
}

export default CustomerProduct
