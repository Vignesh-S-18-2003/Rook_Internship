import React, { useState, useEffect, useRef } from 'react';
import PaymentPDF from './PaymentPDF';
import { useNavigate } from 'react-router-dom';
import { init } from 'emailjs-com';

function Payment({otp,setOtp, list, address, deliveryDetails, setDeliveryDetails, details, setTotal, gs, setgst }) {
  const [cop, setCop] = useState('');
  const [style, setStyle] = useState({ color: '' });
  const [tot, setTot] = useState(0);
  const [sub1, setSub1] = useState(0);
  const [sub2, setSub2] = useState(0);// Added state for the second subtotal
  const navigate = useNavigate();
  const contentRef = useRef(null);
  
  const handledel1InputChange = (e) => {
    const { name, value } = e.target;
    let newTot = parseFloat(sub1);
  
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  
    if (value === 'Express Delivery(+ Rs90)') {
      newTot += 90;
    } else {
      newTot += 50;
    }
    setSub2(newTot.toFixed(2)); // Update the second subtotal
    setTot(newTot.toFixed(2));
  };
  
  const handledel2InputChange = (e) => {
    const { name, value } = e.target;
    let newTot = parseFloat(sub2);
  
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  
    if (value === 'Cash on Delivery (+ Rs50)') {
      newTot += 50;
    }
    setTot(newTot);
  };

const calculateAmount = () => {
  let totalAmount = 0;
  let totalGST = 0;
  
  list.forEach(product => {
    let subtotal = product.quantity * product.price;
    let gst = 0;
    
    if (product.hsnCode === "HSN-123") {
      gst = (subtotal * 16) / 100;
    } else if (product.hsnCode === "HSN-234") {
      gst = (subtotal * 14) / 100;
    } else {
      gst = (subtotal * 18) / 100;
    }
    
    totalAmount += subtotal + gst;
    totalGST += gst;
  });
  setgst(totalGST);
    
    return totalAmount.toFixed(2);
  };
  useEffect(() => {
    if (list.length === 0) {
      navigate('/home');
    }
  }, [list, navigate]);
  useEffect(() => {
    const initialAmount = calculateAmount();
    setSub1(initialAmount);
    setSub2(initialAmount);
    setTot(initialAmount);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === 'yzkxy10') {
      setCop("Coupon is Valid");
      setStyle({ color: 'green' });
      setTot((prevAmount) => (prevAmount - 25).toFixed(2));
    } else if (val === "") {
      
      setTot((prevAmount) => (parseInt(prevAmount) + 25).toFixed(2));
      setCop('');
    } else {
      setCop('Coupon is Invalid');
      setStyle({ color: 'red' });
      setTot(calculateAmount());
    }
  };

  async function handleOrder  () {
    if (!otp) {
      window.alert('OTP Not Verified. Please Verify it')
      await navigate('/address');
    }
    else{
    setTotal(parseFloat(tot)+50);
    if (deliveryDetails.paymentType === '' || deliveryDetails.deliveryType === '') {
      alert('Delivery Type or Payment Type not selected');
    } else {
      navigate('/order');
    }
  }
  };
  

  async function  handlePay () {
    if (!otp) {
      window.alert('OTP Not Verified. Please Verify it')
      await navigate('/address');
    }
    else{
    setTotal(parseFloat(tot)+50);
    if(deliveryDetails.paymentType==='' || deliveryDetails.deliveryType==='')
      {
        alert('DeliveryType or PaymentType not selected');
        return;
      }
    var options = {
      key: "rzp_test_AdiGQG3cgsA1uM",
      key_secret: "r4bASMAWErlkS5AE1NcZ1jpM",
      amount: (parseFloat(tot)+50) * 100,
      currency: "INR",
      name: "Vignesh",
      description: "for testing purpose",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Vignesh",
        email: "vickykid250@gmail.com",
        contact: "8754582761"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }
  };

  const handleSendWhatsApp = () => {
    const message = `
      Confirmation Payment\n
      Name: ${address.name}\n
      GST Calculation: ${gs}\n
      Mode Of Delivery: ${details.deliveryType}\n
      Payment Type: ${details.paymentType}\n
      Address: ${address.addressLine1} ${address.addressLine2} ${address.addressLine3}\n
      Pincode: ${address.pincode}\n
      Shipping Charges: ₹50\n
      Total Amount to pay: ₹${tot}\n
    `;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = () => {
    const subject = "Order Confirmation";
    const message = `
      Confirmation Payment\n
      Name: ${address.name}\n
      GST Calculation: ${gs}\n
      Mode Of Delivery: ${details.deliveryType}\n
      Payment Type: ${details.paymentType}\n
      Address: ${address.addressLine1} ${address.addressLine2} ${address.addressLine3}\n
      Pincode: ${address.pincode}\n
      Shipping Charges: ₹50\n
      Total Amount to pay: ₹${tot}\n
    `;

    const mailtoUrl = `mailto:?subject=${subject}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, '_blank');
  };

  const isTamilNadu = address.state === "Tamil Nadu";

  return (
    <div className='payPage'>
      <h1>Confirmation Payment</h1>
      <table className='tbl'>
        <thead>
          <tr>
            <th>Name</th>
            <th>HSN Code</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            {isTamilNadu ? (
              <>
                <th>SGST</th>
                <th>CGST</th>
              </>
            ) : (
              <th>IGST</th>
            )}
            <th>Product Total</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => {
            const gstRate = product.hsnCode === "HSN-123" ? 16 : product.hsnCode === "HSN-234" ? 14 : 18;
            const subtotal = (product.price * product.quantity).toFixed(2);
            const gstAmount = ((product.price * product.quantity) * gstRate / 100).toFixed(2);
            const total = (parseFloat(subtotal) + parseFloat(gstAmount)).toFixed(2);
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.hsnCode}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>₹{subtotal}</td>
                {isTamilNadu ? (
                  <>
                    <td>₹{(gstAmount / 2).toFixed(2)} </td>
                    <td>₹{(gstAmount / 2).toFixed(2)} </td>
                  </>
                ) : (
                  <td>₹{gstAmount}</td>
                )}
                <td>₹{total}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={isTamilNadu ? "7" : "6"} style={{ textAlign: 'right' }}>Total Amount (including GST):</td>
            <td>₹{tot}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "7" : "6"} style={{ textAlign: 'right' }}>Shipping Charges (Mandatory):</td>
            <td>₹50</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "7" : "6"} style={{ textAlign: 'right' }}>Total Amount (including Shipping):</td>
            <td>₹{parseFloat(tot)+50}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>Name:</h3></td><td colSpan={3}><h3>{address.name}</h3></td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>Mode Of Delivery: </h3></td><td colSpan={3}>{details.deliveryType}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>Payment Type: </h3></td><td colSpan={3}>{details.paymentType}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>GST Number: </h3></td><td colSpan={3}>33ABAFM784MA19Z</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>Address: </h3></td><td>{address.addressLine1} {address.addressLine2} {address.addressLine3}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}><h3>Pincode: </h3></td><td colSpan={3}>{address.pincode}</td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "5" : "4"}>
              <h3>Enter Discount Coupon:</h3></td><td colSpan={3}><h3><input type="text" placeholder="Enter Here" onChange={handleInputChange} /><span style={style}>{cop}</span></h3>
            </td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "8" : "7"}>
              <div>
                <label>Delivery Type:</label><br />
                <input
                  type="radio"
                  id="normal"
                  name="deliveryType"
                  value="Normal Delivery"
                  onChange={handledel1InputChange}
                />
                <label htmlFor="normal">Normal Delivery</label><br />
                <input
                  type="radio"
                  id="express"
                  name="deliveryType"
                  value="Express Delivery(+ Rs90)"
                  onChange={handledel1InputChange}
                />
                <label htmlFor="express">Express Delivery (+ ₹90)</label><br />
                
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "8" : "7"}>
              <div>
                <label>Payment Type:</label><br />
                <input
                  type="radio"
                  id="online"
                  name="paymentType"
                  value="Online Payment (No Additional Charge)"
                  required
                  onChange={handledel2InputChange}
                />
                <label htmlFor="online">Online Payment (Priority Processing)</label><br />
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentType"
                  value="Cash on Delivery (+ Rs50)"
                  required
                  onChange={handledel2InputChange}
                />
                <label htmlFor="cashOnDelivery">Cash on Delivery (+ ₹50)</label><br />
                
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={isTamilNadu ? "8" : "7"}>
              <PaymentPDF address={address} totalAmount={parseFloat(tot)+50} list={list} details={details} gst={gs}/><br />
              {details.paymentType !== 'Cash on Delivery (+ Rs50)' ? <button onClick={handlePay} type='submit'>Pay Now</button> : <button type='submit' onClick={handleOrder}>Order Now</button>}<br /><br />
              <button className='button1' onClick={handleSendWhatsApp}>Send to WhatsApp</button><label>    </label><button className='button1' onClick={handleSendEmail}>Send to Email</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Payment;
