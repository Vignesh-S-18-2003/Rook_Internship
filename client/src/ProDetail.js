import React from 'react'

function ProDetail({name,price,quantity}) {
  return (
  
   
    <tr className="product">
      <td>{name}</td>
      <td>{price}</td>
      <td>{quantity}</td>
    </tr>
  )
}

export default ProDetail