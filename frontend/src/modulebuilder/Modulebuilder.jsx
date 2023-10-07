import React, { useState } from 'react';
import './modulebuilder.css';

export default function Modulebuilder() {

  const [formData, setFormData] = useState({
    uname: '',
    // selected day
    day: '',
    // starting value for the Distance Base Price
    baseprice: '',
    //  ending value for the Distance Base Price.
    bpUptoKm: '',
    // Additional Price per Km (Distance Additional Price)
    additionalprice: '',
    // Time Multiplier Factor up to 1 Km
    tmf1: '',
    // Time Multiplier Factor from 1 Km to 2 Km
    tmf2: '',
    // Time Multiplier Factor after 2 Km.
    tmf3: '',
    // Waiting Charges per minute
    waitcharge: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform calculations based on formData
    const price = calculatePrice(formData);
    

    // Use the calculated price as needed (e.g., display it)
    console.log('Calculated Price:', price);
  };

  const calculatePrice = (data) => {
    // Perform your calculations here based on the form data
    const { baseprice, bpUptoKm, additionalprice, tmf1, tmf2, tmf3, waitcharge } = data;

    // Additional distance
    const additionalDistance = parseFloat(bpUptoKm) - parseFloat(baseprice);

    // Calculate Price using the formula
    // Short forms : DBP: Distance base price,  DAP: Distance additional price,  TMF:  Time multiple factor 
    const calculatedPrice = (parseFloat(baseprice) + additionalDistance * parseFloat(additionalprice)) +
      (additionalDistance <= 1 ? parseFloat(tmf1) :
        (additionalDistance <= 2 ? parseFloat(tmf2) : parseFloat(tmf3))) +
      parseFloat(waitcharge);

    return calculatedPrice;
  };

  return (
    <div className='module-page'>
      <header className='topbar'>
        <h2>Configure your Pricing Module</h2>
        <h3>You can now customize each day's Dynamic Pricing.</h3>
      </header>
      <form className='formbox' onSubmit={handleSubmit}>
        <div className='day'>
          <h2>Day: </h2><br />
          <select id="day" name="day" onChange={handleInputChange}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select><br /><br />
          <label>Username:</label>
          <input type="text" id="uname" name="uname" onChange={handleInputChange} required />
        </div>
        <div className='DBP'>
          <h3>Distance Base Price (DBP)</h3><br />
          <label>Base Price:</label>
          <input type="text" name="baseprice" id="baseprice" onChange={handleInputChange} required />
          <label>upto</label>
          <input type="text" name="bpUptoKm" id="bpUptoKm" onChange={handleInputChange} required />
          <label>Additional Price per Km:</label>
          <input type="text" name="additionalprice" id="additionalprice" onChange={handleInputChange} required /><br /><br />
        </div>
        <div className='TMF'>
          <h3>Time Multiplier Factor (TMF)</h3><br />
          <label>TMF upto 1Km:</label>
          <input type="text" name="tmf1" onChange={handleInputChange} required /><br /><br />
          <label>TMF from 1Km-2Km:</label>
          <input type="text" name="tmf2" onChange={handleInputChange} required /><br /><br />
          <label>TMF after 2Kms:</label>
          <input type="text" name="tmf3" onChange={handleInputChange} required /><br /><br />
        </div>
        <div className='WC'>
          <h3>Waiting Charges (WC)</h3><br />
          <label>Per minute charges:</label>
          <input type="text" name="waitcharge" id="waitcharge" onChange={handleInputChange} required /><br /><br /><br /><br />
        </div>
        <input type="submit" value="Submit Model" />
      </form>
    </div>
  );
}