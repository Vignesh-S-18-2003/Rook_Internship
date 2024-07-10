import React from 'react'
import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <div className='top'> 
        <h1>Rook-Shop</h1>
        <div>
          <Link to="home" className='nav'>Home</Link>
          <Link to="cart" className='nav' >Cart</Link>
          <Link to="address" className='nav'>Address</Link>
          <Link to="pay" className='nav'>Payment</Link>
        </div>
    </div>
  )
}

export default Topbar