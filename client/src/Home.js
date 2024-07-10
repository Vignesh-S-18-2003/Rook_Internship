import React from 'react';
import { useNavigate } from 'react-router-dom';function Home({ products, cart, setCart, setList }) {
    const navigate = useNavigate();
  
    const addToCart = (product) => {
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        const updatedCart = cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
  
    const orderNow = (product) => {
      setList([product]);
      navigate('/address');
    };
  
    return (
      <div className="main-products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <h3 className="product-description">Rs {product.price}</h3>
  
            <div className="product-buttons">
              <button className="order-button" onClick={() => orderNow(product)}>
                Order
              </button>
              <button className="cart-button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Home;
  