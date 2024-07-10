import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dummy({deliveryDetails, setDeliveryDetails}) {

  const navigate=useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };
  return (
    <div>

        <div>
          <tr>

          <td colSpan='7'><label>Delivery Type:</label><br/></td>
          <td >
          <input
            type="radio"
            id="express"
            name="deliveryType"
            value="Express Delivery(+ Rs90)"
            onChange={handleInputChange}
          />
          <label htmlFor="express">Express Delivery (+ ₹90)</label><br/>
          <input
            type="radio"
            id="normal"
            name="deliveryType"
            value="Normal Delivery"
            onChange={handleInputChange}
          />
          <label htmlFor="normal">Normal Delivery</label><br/>
          </td>
          </tr>
        </div>

        <div>
        <tr>

<td colSpan='7'><label>Delivery Type:</label><br/></td>
<td >
          <label>Payment Type:</label><br/></td>
          <td>
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentType"
            value="Cash on Delivery (+ Rs50)"
            onChange={handleInputChange}
          />
          <label htmlFor="cashOnDelivery">Cash on Delivery (+ ₹50)</label><br/>
          <input
            type="radio"
            id="online"
            name="paymentType"
            value="Online Payment (No Additional Charge)"
            onChange={handleInputChange}
          />
          <label htmlFor="online">Online Payment (No Additional Charge)</label><br/>
          </td>
</tr>
        </div>
    </div>
  );
}

export default Dummy;
