import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';

function Products({ list, setList, products, setProducts }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (list.length === 0) {
      navigate('/home');
    }
  }, [list, navigate]);

  const handleIncrease = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleRemove = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    const selectedProducts = products.filter((product) => product.quantity > 0);
    setList(selectedProducts);
    navigate('/address');
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              onIncrease={() => handleIncrease(product.id)}
              onDecrease={() => handleDecrease(product.id)}
              onRemove={() => handleRemove(product.id)}
            />
          ))}
        </tbody>
      </table>
      <h3>Total: Rs {products.reduce((total, product) => total + product.price * product.quantity, 0)}</h3>
      
      {products.length > 0 && (
        <h3 className="check" onClick={handleCheckout}>
          CheckOut
        </h3>
      )}
    </div>
  );
}

export default Products;
