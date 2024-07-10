import React, { useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

function Order({ address, list, total }) {
  useEffect(() => {
  //    const sendEmail = () => {
  //      emailjs.send('service_x3qalza', 'template_h1m4mc6', {
  //        to_email: address.email,
  //        message: `
  //          Name: ${address.name}
  //          Address: ${address.addressLine1} ${address.addressLine2}
  //          Pincode: ${address.pincode}
  //          Order Details:
  //          ${list.map(item => `${item.name}: ${item.quantity}`).join('\n')}
  //          Total Amount to Pay: ${total}
  //        `,
  //      }, 'aBpQc8OCMIz7ZxUTd')
  //      .then((response) => {
  //        console.log('SUCCESS!', response.status, response.text);
  //      }, (error) => {
  //        console.log('FAILED...', error);
  //        alert('Failed to send email.');
  //      });

  //      emailjs.send('service_x3qalza', 'template_h1m4mc6', {
  //        to_email: 'vigneshsm2003@gmail.com',
  //        message: `
  //          Name: ${address.name}
  //          Address: ${address.addressLine1} ${address.addressLine2}
  //          Pincode: ${address.pincode}
  //          Order Details:
  //          ${list.map(item => `${item.name}: ${item.quantity}`).join('\n')}
  //      Total Amount to Pay: ${total}
  //          Order Id: 12ABX11121
  //          Order Placed 
  //        `,
  //      }, 'aBpQc8OCMIz7ZxUTd')
  //      .then((response) => {
  //        console.log('SUCCESS!', response.status, response.text);
  //      }, (error) => {
  //        console.log('FAILED...', error);
  //        alert('Failed to send email.');
  //      });
  //    };
  const orderData = {
    name: address.name,
    email: address.email,
    mobile_no: '+' + address.number,
    items: list.filter(item => item.quantity > 0).map(item => ({
      name: item.name,
      quantity: item.quantity
    })),
    address: {
      line1: address.addressLine1,
      line2: address.addressLine2,
      pincode: address.pincode
    },
    total
  };

  // Send the order data to the server
  axios.post('http://localhost:3000/api/orders', orderData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Order confirmed:', response.data);
  })
  .catch(error => {
    console.error('Error sending order:', error);
  });
  }, [address, list, total]);

  return (
    <div className='payPage'>
      <h2>Order Confirmed</h2>
      <h1>Cash On Delivery</h1>
      <h3>Name: {address.name}</h3>
      {list.map((item, index) => (
        item.quantity > 0 && <h3 key={index}>{item.name} Quantity: {item.quantity}</h3>
      ))}
      <h3>Address: {address.addressLine1} {address.addressLine2}</h3>
      <h3>Number: {address.number.slice(2)}</h3>
      <h3>Pincode: {address.pincode}</h3>
      <h1>Total Amount to Pay: {total}</h1>
    </div>
  );
}

export default Order;
