import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Delivery({deliveryDetails, setDeliveryDetails}) {

  const navigate=useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', deliveryDetails);
    navigate("/pay");
  };

  return (
    <div className="delivery-container">
      <h2>
  Delivery Details
</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="day">Select Delivery Day: </label>
          <select
            id="day"
            name="day"
            value={deliveryDetails.day}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div>
          <label>Choose Delivery Time:</label><br/>
          <input
            type="radio"
            id="morning"
            name="time"
            value="Morning (9:00 AM - 12:00 PM)"
            onChange={handleInputChange}
          />
          <label htmlFor="morning">Morning (9:00 AM - 12:00 PM)</label><br/>
          <input
            type="radio"
            id="afternoon"
            name="time"
            value="Afternoon (12:00 PM - 3:00 PM)"
            onChange={handleInputChange}
          />
          <label htmlFor="afternoon">Afternoon (12:00 PM - 3:00 PM)</label><br/>
          <input
            type="radio"
            id="evening"
            name="time"
            value="Evening (3:00 PM - 6:00 PM)"
            onChange={handleInputChange}
          />
          <label htmlFor="evening">Evening (3:00 PM - 6:00 PM)</label><br/>
        </div>

        <div>
          <label>Delivery Type:</label><br/>
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
        </div>

        <div>
          <label>Payment Type:</label><br/>
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
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Delivery;
