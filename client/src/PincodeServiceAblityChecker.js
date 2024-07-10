import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Address({ address, setAddress }) {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState(false);

  const handlePincodeChange = async (e) => {
    const { value } = e.target;
    setPincode(value);
    try {
      const response = await fetch(`https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${value}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": '7d78cb53483e41d3f8ff6051a9b54547d7706515'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.delivery_codes && data.delivery_codes.length > 0) {
        const firstPostalCode = data.delivery_codes[0].postal_code;
        setCity(firstPostalCode.city);
        setDistrict(firstPostalCode.district);
        setAddress({
          ...address,
          city: firstPostalCode.city,
          district: firstPostalCode.district
        });
        setState(true);
      } else {
        setState(false); 
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      setCity('');
      setDistrict('');
      setState(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', address);
    navigate('/delivery');
  };

  return (
    <div className="address-container">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit}>
        

        {state && (
          <>
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              required
            /><br/><br/>

            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
            /><br/><br/>

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              disabled
            /><br/><br/>

            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              disabled
            /><br/><br/>

            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select State</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Telangana">Telangana</option>
            </select><br/><br/>
          </>
        )}
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={pincode}
          onChange={handlePincodeChange}
          pattern="[0-9]{6}"
          title="Enter 6-digit pincode"
          required
        /><br/><br/>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value="India"
          disabled
        /><br/><br/>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Address;
