import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import emailjs from 'emailjs-com';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Address({list, otp,setOtp,address, setAddress, pincode, setPincode }) {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [state, setState] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    if (list.length===0) {
      navigate('/home');
    }
  }, [list, navigate]);
  // const sendOtp = async () => {
  //   try {
  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //         'size': 'invisible',
  //         'callback': (response) => {
  //           console.log('Recaptcha resolved');
  //         }
  //       }, auth);
  //     }
  //     const appVerifier = window.recaptchaVerifier;
  //     const phoneNumber = `+${address.number}`;
  //     const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     console.log(result);
  //     setConfirmationResult(result);
  //     setOtpSent(true);
  //     setMessage('OTP sent successfully!');
  //   } catch (err) {
  //     console.log(err);
  //     setMessage('Failed to send OTP. Please try again.');
  //   }
  // };

  // const verifyOtp = async () => {
  //   try {
  //     if (confirmationResult) {
  //       const result = await confirmationResult.confirm(otp);
  //       console.log('User signed in successfully:', result.user);
  //       setMessage('OTP verified successfully!');
  //     } else {
  //       console.log('No confirmation result available');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setMessage('Invalid OTP. Please try again.');
  //   }
  // };
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  };

  const sendOtpEmail = (otp) => {
    emailjs.send('service_3j9xilv', 'template_kzd3u0o', {
      to_email: address.email,
      otp: otp,
    }, 'UNOhaytppBvqNzQ1w')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setOtpSent(true);
        setMessage('OTP has been sent to your email.');
      }, (error) => {
        console.log('FAILED...', error);
        setMessage('Failed to send OTP. Please try again.');
      });
  };

  const handleSendOtp = () => {
    const newOtp = generateOtp();
    sendOtpEmail(newOtp);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setMessage('OTP verified successfully!');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handlePincodeChange = async (e) => {
    const { value } = e.target;
    setPincode(value);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data[0] && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const firstPostalCode = data[0].PostOffice[0];
        setDistrict(firstPostalCode.District);
        setAddress((prevAddress) => ({
          ...prevAddress,
          pincode: value,
          district: firstPostalCode.District,
          state: firstPostalCode.State,
        }));
        setState(true);
      } else {
        setState(false);
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      setDistrict('');
      setState(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleWhatsAppChange = (e) => {
    const { checked } = e.target;
    setIsWhatsApp(checked);
    if (checked) {
      setWhatsAppNumber(address.number);
    } else {
      setWhatsAppNumber('');
    }
  };

  const handleWhatsAppNumberChange = (number) => {
    setWhatsAppNumber(number);
    setAddress({ ...address, whatsapp: number });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', address);
    if (message === 'OTP verified successfully!') {
      navigate('/pay');
    } else {
      window.alert('OTP not Verified');
    }
  };

  return (
    <div className="address-container">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit}>
        
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              id="customername"
              name="name"
              value={address.name}
              onChange={handleInputChange}
              required
            /><br /><br />
            <label htmlFor="number">Mobile Number</label>
            <PhoneInput
              country={'in'}
              value={address.number}
              onChange={(number) => setAddress({ ...address, number })}
            /><div><br/>
            Is this WhatsApp Number : Yes  <input
             type="checkbox"
             id="whatsapp-checkbox"
             name="whatsapp"
             checked={isWhatsApp}
             onChange={handleWhatsAppChange}
           />
         </div>
            <br/>
            
           
            {isWhatsApp || (
              <>
                <label htmlFor="whatsapp-number">WhatsApp Mobile Number</label>
                <PhoneInput
                  country={'in'}
                  value={whatsAppNumber}
                  onChange={handleWhatsAppNumberChange}
                />
              </>
            )}

            <label htmlFor="number1">Alternate Mobile Number</label>
            <input
              type="text"
              id="number1"
              name="number1"
              value={address.number1}
              onChange={handleInputChange}
              placeholder="+91"
              title="Enter 10-digit Number"
              pattern="[0-9]{10}"
            /><br /><br />
            <div>
      <label htmlFor="email">Customer Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={address.email}
        onChange={handleInputChange}
        required
      /><br /><br />
      <button type="button" onClick={handleSendOtp}>Send OTP</button>
      <br /><br />
      {otpSent && (
        <div className="in">
          <input
            type="text"
            className="otp"
            pattern="[0-9]{6}"
            title="Enter 6-digit OTP"
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
          />
          <button type="button" onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <br /><br />
    </div>
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              required
            /><br /><br />
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
            /><br /><br />
            <label htmlFor="remarks">Remarks</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={address.remarks}
              onChange={handleInputChange}
            /><br /><br />
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
        /><br /><br />
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              disabled
            /><br /><br />

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
            </select><br /><br />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value="India"
          disabled
        /><br /><br />
        <button type="submit">Next</button>
        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}

export default Address
