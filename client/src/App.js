import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Main from './Main';
import Address from './Address';
import Product from './Product';
import Products from './Products';
import Dummy from './Dummy';
import Delivery from './Delivery';
import Payment from './Payment';
import PincodeServiceabilityChecker from './PincodeServiceAblityChecker';
import Order from './Order';
import Home from './Home';
import image1 from './image.jpg'; 
import image2 from './image2.jpg'; 
import image3 from './image3.jpg';
import image4 from './image4.jpg'; 
import image5 from './image5.jpg'; 
import image6 from './image6.jpg';
import image7 from './image7.jpg'; 
import image8 from './image8.jpg'; 
import image9 from './image9.png'; 
import image10 from './image10.jpg'; 


function App() {
  const [list, setList] = useState([]);
  const [gst,setgst]=useState(0);
  const [cart, setCart]=useState([]);

  
  const [otp, setOtp] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple 14 Pro', price: 11999, quantity: 1, hsnCode: 'HSN-123',image:image1 },
    { id: 2, name: 'Vivo Y21', price: 15999, quantity: 1, hsnCode: 'HSN-345',image:image2 },
    { id: 3, name: 'OPPO F5', price: 20999, quantity: 1, hsnCode: 'HSN-234' ,image:image3},
    { id: 4, name: 'Xiomi 5G', price: 12999, quantity: 1, hsnCode: 'HSN-123',image:image4 },
    { id: 5, name: 'Xiomu 9T', price: 18999, quantity: 1, hsnCode: 'HSN-234',image:image5 },   
    { id: 6, name: 'Redmi 12 5G', price: 15999, quantity: 1, hsnCode: 'HSN-123',image:image6},
    { id: 7, name: 'Realme S6', price: 12999, quantity: 1, hsnCode: 'HSN-345',image:image7 },
    { id: 8, name: 'Realme Narzo 30 Pro', price: 20999, quantity: 1, hsnCode: 'HSN-234',image:image8 },
    { id: 9, name: 'IQOO Z3', price: 15999, quantity: 1, hsnCode: 'HSN-123',image:image9 },
    { id: 10, name: 'Oneplus Nord CE3', price: 10999, quantity: 1, hsnCode: 'HSN-234' ,image:image10}
  ]);


  const [address, setAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    pincode: '',
    email: '',
    whatsapp: '',
    remarks: '',
    number: '',
    number1: '',
    landmark: '',
    state: '',
    country: 'India'
  });
  const [pincode, setPincode] = useState('');
  const [details, setDetails] = useState({
    deliveryType: '',
    paymentType: ''
  });
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path='/home' element={<Home setList={setList}products={products} cart={cart} setCart={setCart} />}/>
          <Route path="cart" element={<Products list={cart} setList={setList} products={cart} setProducts={setCart} />} />
          <Route path="address" element={<Address list={list} otp={otp} setOtp={setOtp} address={address} setAddress={setAddress} pincode={pincode} setPincode={setPincode} />} />
          <Route path="pay" element={<Payment otp={otp} setOtp={setOtp} list={list} address={address} details={details} setTotal={setTotal} deliveryDetails={details} setDeliveryDetails={setDetails} setgst={setgst} gs={gst} />} />
          <Route path="order" element={<Order list={list} address={address} details={details} total={total} />} />
          <Route path="dummy" element={<Dummy />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
