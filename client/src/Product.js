import React from 'react';

const Product = ({ name, price, quantity, onIncrease, onDecrease, onRemove }) => {
  return (
    <tr className="product">
      <td>{name}</td>
      <td>Rs {price}</td>
      <td>
        <button onClick={onIncrease} className='btn'>+</button> {quantity} <button onClick={onDecrease} className='btn'>-</button>
      </td>
      <td>
        <button onClick={onRemove} className='btn rm-btn'>Remove</button>
      </td>
    </tr>
  );
};

export default Product;
